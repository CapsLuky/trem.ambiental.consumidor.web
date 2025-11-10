import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { concatMap, takeUntil } from 'rxjs/operators';

import { EParametroUsuario } from "@EnumCommon";
import { AutenticacaoService } from './../../services/autenticacao.service';
import { UsuarioOutputModel } from '../../models/usuarioOutput.model';

@Component({
  selector: 'page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public usuario: UsuarioOutputModel = new UsuarioOutputModel('','');
  public processando = false;
  public mensagemError!: string;
  public loginFormInvalido = false;
  public passwordVisible = false;
  public password?: string;
  private _destroySubscribes$ = new Subject<void>();

  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(
    private readonly router: Router,
    private readonly autenticacaoService: AutenticacaoService) { }

  ngOnInit(): void {
  }

  public onKeyupLogarComEnter() {
    this.onClickLogar();
  }

  public onClickLogar() {
    if (!this.loginForm.valid) {
      this.loginFormInvalido = true;
      this.loginForm.controls.email.markAsDirty();
      this.loginForm.controls.email.updateValueAndValidity();
      this.loginForm.controls.senha.markAsDirty();
      this.loginForm.controls.senha.updateValueAndValidity();
      return;
    }

    this.processando = true;
    this.mensagemError = '';

    this.autenticacaoService.logar(this.usuario)
    .pipe(
      concatMap(resultLogin => {
      if (!resultLogin.success) {
        this.mensagemError = resultLogin.errors[0].mensagem;
        this.processando = false;
      }
      return this.autenticacaoService.verificarPrimeiroCadastro(resultLogin.payload.id);
      }),
      takeUntil(this._destroySubscribes$)
    )
    .subscribe(resultPrimeiroCadastro => {

      if (resultPrimeiroCadastro.success) {

        localStorage.setItem(EParametroUsuario.PrimeiroCadastro, resultPrimeiroCadastro.payload.toString());

        if(resultPrimeiroCadastro.payload){
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/primeiro-cadastro/dados-pessoais']);
        }

      } else {
        this.mensagemError = resultPrimeiroCadastro.errors[0].mensagem;
        this.processando = false;
      }
    });
  }

  public onClickIrParaEsqueceuSenha() {
    this.router.navigate(['/login/recuperar-senha'], {
      queryParams: { email: encodeURI(this.usuario.email) },
    });
  }

  ngOnDestroy() {
    this._destroySubscribes$.next();
    this._destroySubscribes$.complete();
  }

}
