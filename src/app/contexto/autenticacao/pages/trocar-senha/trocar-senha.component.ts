import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AutenticacaoService } from './../../services/autenticacao.service';

@Component({
  selector: 'app-trocar-senha',
  templateUrl: './trocar-senha.component.html',
  styleUrls: ['./trocar-senha.component.scss']
})
export class TrocarSenhaComponent implements OnInit, OnDestroy {
  public senhaAtual!: string;
  public novaSenha!: string;
  public confirmarNovaSenha!: string;
  public alertaConfirmarSenha = 'Confirme a senha nova';
  public btnTexto = 'TROCAR SENHA';
  public processando = false;
  public mensagemError!: string;
  public mensagemSucesso!: string;
  public loginFormInvalido = false;

  public passwordVisible1 = false;
  public password1?: string;
  public passwordVisible2 = false;
  public password2?: string;
  public passwordVisible3 = false;
  public password3?: string;

  private _destroySubscribes$ = new Subject<void>();

  constructor(private readonly _autenticacaoService: AutenticacaoService,
              private readonly _location: Location) {
  }

  ngOnInit(): void {
  }

  onClickTrocarSenha(trocarSenhaForm: NgForm): void {

    if(this.btnTexto==='VOLTAR PARA O SITE'){
      this.onVoltarParaTelaAnterior();
    }

    if (!trocarSenhaForm.valid) {
      this.loginFormInvalido = true;
      trocarSenhaForm.controls.password.markAsDirty();
      trocarSenhaForm.controls.password.updateValueAndValidity();
      trocarSenhaForm.controls.novaSenha.markAsDirty();
      trocarSenhaForm.controls.novaSenha.updateValueAndValidity();
      trocarSenhaForm.controls.confirmarNovaSenha.markAsDirty();
      trocarSenhaForm.controls.confirmarNovaSenha.updateValueAndValidity();
      return;
    }

    if (this.novaSenha !== this.confirmarNovaSenha) {
      this.loginFormInvalido = true;
      this.alertaConfirmarSenha = 'Senha não confere';
      trocarSenhaForm.controls.confirmarNovaSenha.setErrors({ incorrect: true });
      return;
    }
    this.processando = true;

    this._autenticacaoService.alterarSenha(this.senhaAtual, this.novaSenha)
    .pipe(
      takeUntil(this._destroySubscribes$)
    )
    .subscribe((result)=>{
      if (result.success) {
        this.mensagemSucesso = 'Senha alterada com sucesso';
        this.mensagemError = '';
        this.btnTexto = 'VOLTAR PARA O SITE'
      } else {
        this.mensagemError = result.errors[0].mensagem;
        this.mensagemSucesso = '';
      }

      this.processando = false;
    });
  }

  onVoltarParaTelaAnterior(){
    this._location.back();
  }

  ngOnDestroy() {
    this._destroySubscribes$.next();
    this._destroySubscribes$.complete();
  }

}
