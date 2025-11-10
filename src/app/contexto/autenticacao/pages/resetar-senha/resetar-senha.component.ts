import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { AutenticacaoService } from '../../services/autenticacao.service';
import { ResetarSenhaFormModel } from '../../models/resetar-senha-form.model';
import { TrocaSenhaModel } from '../../models/troca-senha.model';


@Component({
  selector: 'ui-element-resetar-senha',
  templateUrl: './resetar-senha.component.html',
  styleUrls: ['./resetar-senha.component.scss']
})
export class ResetarSenhaComponent implements OnInit, OnDestroy {

  public resetarSenhaModel = new ResetarSenhaFormModel('','');
  public alertaConfirmarSenha = 'Confirme a senha nova';
  public alertaResetError = '';
  public alertaResetSucesso = '';
  public processando = false;
  public loginFormInvalido = false;
  private _trocaSenha = new TrocaSenhaModel('','','');
  // public tokenPayloadRO: Observable<PayloadModel>;
  private tokenEmailUrl = '';
  private _destroySubscribes$ = new Subject<void>();
  public bloquearTela = false;
  public emailValidado = '';
  public emailAlteradoComSucesso = '';
  public mensagemErroLinkInvalido = '';

  @ViewChild('resetarSenhaForm')
  resetarSenhaForm!: NgForm;

  constructor(private _activatedRoute: ActivatedRoute,
              private readonly _autenticacaoService: AutenticacaoService) { }

  ngOnInit(): void {
    this.tokenEmailUrl = this._activatedRoute.snapshot.params.token;
    this.bloquearTela = true;
    this.validarTokenEEmail();
  }

  async validarTokenEEmail() {
    this.mensagemErroLinkInvalido = '';

    this._autenticacaoService.validarLinkTrocaDeSenha(this.tokenEmailUrl)
    .pipe(
      takeUntil(this._destroySubscribes$),
      finalize(() => {
        this.processando = false;
        this.bloquearTela = false;
      })
    )
    .subscribe(result => {
      if (result.success) {
        this.emailValidado = result.payload;

        if(!this.emailValidado?.length){
          this.mensagemErroLinkInvalido = 'Link expirado ou inválido';
        }
      }
      else {
        this.emailValidado = '';
        this.mensagemErroLinkInvalido = 'Link expirado ou inválido';
        this.alertaResetError = result.errors[0].mensagem;
      }
    });
  }

  onClickTrocarSenha(): void {

    if (!this.resetarSenhaForm.valid) {
      this.loginFormInvalido = true;
      this.resetarSenhaForm.controls['novaSenha'].markAsDirty();
      this.resetarSenhaForm.controls['novaSenha'].updateValueAndValidity();
      this.resetarSenhaForm.controls['confirmarNovaSenha'].markAsDirty();
      this.resetarSenhaForm.controls['confirmarNovaSenha'].updateValueAndValidity();
      return;
    }

    if (this.resetarSenhaModel.novaSenha !== this.resetarSenhaModel.confirmarNovaSenha) {
      this.loginFormInvalido = true;
      this.alertaConfirmarSenha = 'Atenção! As duas senhas não estão iguais';
      this.resetarSenhaForm.controls['confirmarNovaSenha'].setErrors({ 'incorrect': true });
      return;
    }

    this.processando = true;
    this._trocaSenha.SenhaNova = this.resetarSenhaModel.novaSenha;
    this._trocaSenha.email = this.emailValidado;
    this._trocaSenha.tokenRedefinirSenha = this.tokenEmailUrl;

    this._autenticacaoService.redefinirSenha(this._trocaSenha)
    .pipe(
      takeUntil(this._destroySubscribes$),
      finalize(() => {
        this.processando = false;
      })
    )
    .subscribe(result => {
      if (result.success) {
        this.emailAlteradoComSucesso =  result.payload.toString();
      }
      else {
        this.emailAlteradoComSucesso = 'erro';
        this.alertaResetError = result.errors[0].mensagem;
      }
    });
  }

  ngOnDestroy() {
    this._destroySubscribes$.next();
    this._destroySubscribes$.complete();
  }

}
