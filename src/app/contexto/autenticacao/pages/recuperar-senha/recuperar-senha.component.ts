import { tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ɵConsole, OnDestroy } from '@angular/core';
import { FormGroup, NgForm, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UsuarioOutputModel } from '../../models/usuarioOutput.model';
import { AutenticacaoService } from '../../services/autenticacao.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent implements OnInit, OnDestroy {
  public usuario: UsuarioOutputModel = new UsuarioOutputModel('','');
  public processando = false;
  public recuperarSenhaFormInvalido = false;
  public mensagemAlerta!: string;
  public mensagemAlertaErro = false;
  private _recuerarSenhaSubscription = new Subscription();

  constructor(private readonly _router: Router,
              private readonly _autenticacaoService: AutenticacaoService) { }

  ngOnInit(): void {
  }

  public onSolicitarResetSenha(recuperarSenhaForm: NgForm): void {
    if (!recuperarSenhaForm.valid) {
      this.recuperarSenhaFormInvalido = true;
      recuperarSenhaForm.controls.email.markAsDirty();
      recuperarSenhaForm.controls.email.updateValueAndValidity();
      return;
    }
    this.processando = true;

    this.usuario = recuperarSenhaForm.value;

    this._recuerarSenhaSubscription = this._autenticacaoService.enviarSenhaPorEmail(this.usuario.email).subscribe(
      (result) => {

        this.processando = false;
        if(result.success) {
          this.mensagemAlertaErro = false;
          return this.mensagemAlerta = 'Se este for o e-mail cadastrado, você receberá um e-mail para recuperar sua senha.';
        } else {
          this.mensagemAlertaErro = true;
          return this.mensagemAlerta = 'Ocorreu um problema ao solicitar a recuperação de senha';
        }

      }
    );

  }

  public onVoltarParaLogin(): void {
    this._router.navigate(['/login']);
  }

  ngOnDestroy() {
    this._recuerarSenhaSubscription.unsubscribe();
  }

}
