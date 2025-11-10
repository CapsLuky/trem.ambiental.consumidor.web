import { Subject, Subscription } from 'rxjs';
import { MenuLateralService } from 'src/app/contexto/inicio/services/menu-lateral.service';
import { Router } from '@angular/router';
import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import { AutenticacaoService } from './../../../contexto/autenticacao/services/autenticacao.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'component-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.scss']
})
export class MenuSuperiorComponent implements OnDestroy {
  public usuarioLogado: string;
  @Input() menuLateralFechadoInput = false;
  @Output() menuLateralAbertoClick = new EventEmitter<boolean>();
  clickLinkMenuSubscription: Subscription;
  private _destroySubscribes$ = new Subject<void>();

  constructor(private readonly _autenticacaoService: AutenticacaoService,
              private readonly _router: Router,
              private readonly _menuLateralService: MenuLateralService) {

    let tokenModel = _autenticacaoService.buscarInformacaoClienteLogado();
    this.usuarioLogado = tokenModel.nome;
    this.clickLinkMenuSubscription = this._menuLateralService.clickLinkGetEvent()
    .pipe(
      takeUntil(this._destroySubscribes$)
    )
    .subscribe(() => {
      if(localStorage.getItem("telaPequena") === "sim") {
        this.onAbrirFecharMenu();
      }
    });
   }

  onAbrirFecharMenu(){
    this.menuLateralFechadoInput = !this.menuLateralFechadoInput;
    this.menuLateralAbertoClick.emit(this.menuLateralFechadoInput);
  }

  public onSair() {
    this._autenticacaoService.logout();
    window.location.href = '/';
  }

  public onTrocarSenha(){
    this._router.navigate(['login/trocar-senha']);
  }

  public onNavegarDadosPessoais(){
    this._router.navigate(['cadastro/dados-pessoais']);
  }

  ngOnDestroy() {
    this._destroySubscribes$.next();
    this._destroySubscribes$.complete();
  }

}
