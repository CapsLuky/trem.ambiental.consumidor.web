import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { finalize, takeUntil } from 'rxjs/operators';
import { forkJoin, Subject } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';


import { isNullOrUndefined } from 'src/app/common/helper/util';
import { EParametroUsuario } from './../../../../common/enum/parametro-usuario.enum';
import { ParametroUsuarioModel } from './../../../../common/models/parametroUsuario.model';
import { AutenticacaoService } from './../../../autenticacao/services/autenticacao.service';
import { IDadosUsuarioLogado } from './../../models/IDadosUsuarioLogado';
import { DadoPessoalService } from './../../services/dado-pessoal.service';
import { EnderecoModel } from './../../models/Endereco.model';

import { UsuarioCadastroModel } from './../../models/UsuarioCadastro.model';
import { GeneroModel } from '../../models/Genero.model';

@Component({
  selector: 'page-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss']
})
export class DadosPessoaisComponent implements OnInit, OnDestroy, AfterViewInit {

  public passoAtual = -1;
  public conteudo = 'Dados Pessoais';
  public processando = false;
  public idadeValida = '';
  public generoValido = '';
  public condominioValido = '';
  public bloquearTela = false;

  public titleDadosPessoais="Nome email";
  public titleDetalhe="Detalhes";
  public titleEndereco="Endereço";
  public titleConferir="Conferir";

  @ViewChild('cadastroForm') cadastroForm!: NgForm;

  public generoList: Array<GeneroModel> = [
    { genero: 'Homem', id: 1 },
    { genero: 'Mulher', id: 2 }
  ];

  public usuario = new UsuarioCadastroModel(0,'','','',0,'',0);
  public endereco = new EnderecoModel(0,'','');
  private _dadosAtuais!: IDadosUsuarioLogado;
  private _parametroUsuario = new ParametroUsuarioModel(0,EParametroUsuario.PrimeiroCadastro, true);

  private _destroySubscribes$ = new Subject<void>();

  constructor(private readonly _dadoPessoalService: DadoPessoalService,
              private readonly _notificao: NzNotificationService,
              private readonly _router: Router,
              private readonly _autenticacao: AutenticacaoService) {

    if(this._router.url === '/cadastro/dados-pessoais'){
      this.passoAtual = 1;
    }
  }


  ngOnInit(): void {
    this.bloquearTela = true;
    this.buscarDadosDoServidor();
  }

  private buscarDadosDoServidor(){
    this._dadoPessoalService.buscarDadosUsuarioLogado()
    .pipe(
      takeUntil(this._destroySubscribes$),
      finalize(() => {
        this.processando = false;
        this.bloquearTela = false;
      })
    )
    .subscribe(result => {
      if (result.success) {
        this._dadosAtuais = {...result.payload} as IDadosUsuarioLogado;
        this.usuario = this._dadosAtuais;
        this.endereco = this._dadosAtuais;
      }
      else {
        this._notificao.error('ERRO', result.errors[0].mensagem, {nzDuration: 0} );
      }
    });
  }

  onBtnVoltar(): void {
    this.passoAtual -= 1;
  }

  onBtnProximo(): void {

    if(this.passoAtual === -1){
      this.passoAtual += 1;
      return;
    }

    if(!this.validarForm()){
      return;
    }
    this.passoAtual += 1;
  }

  onBtnConfirmar(): void {
    this.processando = true;
    const idUsuario = +this._autenticacao.buscarInformacaoClienteLogado().usuarioId;
    this.usuario.idUsuario = idUsuario;
    this.endereco.idUsuario = idUsuario;
    this._parametroUsuario.idUsuario = idUsuario;

    const usuario$ = this._dadoPessoalService.salvarDadosPessoais(this.usuario);
    const endereco$ = this._dadoPessoalService.salvarEndereco(this.endereco);
    const parametro$ = this._dadoPessoalService.salvarParametroUsuario(this._parametroUsuario);

    forkJoin([usuario$, endereco$, parametro$])
    .pipe(
      takeUntil(this._destroySubscribes$),
      finalize(() => {
        this.processando = false;
      })
    )
    .subscribe(
      resp => {
        let sucesso: Array<boolean> = [false, false, false];
        if(resp[0].success){
          sucesso[0] = true;
        } else{
          this._notificao.error('ERRO', resp[0].errors[0].mensagem, {nzDuration: 0});
        }

        if(resp[1].success){
          sucesso[1] = true;
        } else {
          this._notificao.error('ERRO', resp[1].errors[0].mensagem, {nzDuration: 0});
        }

        if(resp[2].success){
          sucesso[2] = true;
        } else {
          this._notificao.error('ERRO', resp[2].errors[0].mensagem, {nzDuration: 0});
        }

        if (sucesso[0] && sucesso[1] && sucesso[2]) {
          this._notificao.success('Sucesso', 'Dados atualizados');

          this.redirecionarParaHome();
        }
      }
    );
  }

  private redirecionarParaHome(): void{
    const FezPrimeiroCadastro = localStorage.getItem(EParametroUsuario.PrimeiroCadastro);

    if (FezPrimeiroCadastro === "false" || isNullOrUndefined(FezPrimeiroCadastro)) {
      localStorage.setItem(EParametroUsuario.PrimeiroCadastro, 'true');
      this._router.navigate(['/home']);
    }
  }

  private validarForm(): boolean {
    switch (this.passoAtual) {
      case 0: {

        if (this.cadastroForm.invalid) {
          this.cadastroForm.controls.nome.markAsDirty();
          this.cadastroForm.controls.nome.updateValueAndValidity();
          this.cadastroForm.controls.email.markAsDirty();
          this.cadastroForm.controls.email.updateValueAndValidity();
          return false;
        }
        return true;
      }
      case 1: {
        if(this.usuario.idade > 5 && this.usuario.idade < 100){
          this.idadeValida = 'success';
          this.cadastroForm.form.controls['idade'].setErrors(null);

        }
        else {
          this.idadeValida = 'error';
          this.cadastroForm.form.controls['idade'].setErrors({'incorrect': true});
        }

        if(this.usuario.idGenero !== 0){
          this.generoValido = 'success';
          this.cadastroForm.form.controls['idGenero'].setErrors(null);
        }
        else {
          this.generoValido = 'error';
          this.cadastroForm.form.controls['idGenero'].setErrors({'incorrect': true});
        }

        if (this.cadastroForm.invalid) {
          this.cadastroForm.controls.apelido.markAsDirty();
          this.cadastroForm.controls.apelido.updateValueAndValidity();
          return false;
        }

        return true;
      }
      case 2: {

        // if(this.endereco.condominio !== ""){
        //   this.condominioValido = 'success';
        //   this.cadastroForm.form.controls['condominio'].setErrors(null);
        // }
        // else {
        //   this.condominioValido = 'error';
        //   this.cadastroForm.form.controls['condominio'].setErrors({'incorrect': true});
        // }

        if (this.cadastroForm.invalid) {
          this.cadastroForm.controls.condominio.markAsDirty();
          this.cadastroForm.controls.condominio.updateValueAndValidity();
          this.cadastroForm.controls.cep.markAsDirty();
          this.cadastroForm.controls.cep.updateValueAndValidity();
          return false;
        }
        return true;
      }
      case 3: {
        this.conteudo = 'Conferir';
        return true;
      }
      default: {
        this.conteudo = 'error';
        return false;
      }
    }
  }

  onGeneroSelecionado(idGenero: any){
    this.generoValido = 'success';
    this.cadastroForm.form.controls['idGenero'].setErrors(null);
    this.usuario.genero = this.generoList.find(g => g.id === idGenero)?.genero;
  }

  onCondominioSelecionado(){
    this.condominioValido = 'success';
    this.cadastroForm.form.controls['condominio'].setErrors(null);
  }

  onIdadeSelecionada(){
    this.idadeValida = 'success';
    this.cadastroForm.form.controls['idade'].setErrors(null);
  }

  ngAfterViewInit() {
    this.isBiggerScreen();
  }

  isBiggerScreen() {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    if (width < 500) {
      this.titleDadosPessoais='';
      this.titleEndereco='';
      this.titleDetalhe='';
      this.titleConferir='';
    }
  }


  ngOnDestroy() {
    this._destroySubscribes$.next();
    this._destroySubscribes$.complete();
  }
}
