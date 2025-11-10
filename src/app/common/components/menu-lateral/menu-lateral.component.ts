import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { isNullOrUndefined } from 'src/app/common/helper/util';
import { EParametroUsuario } from "@EnumCommon";
import { MenuModel } from 'src/app/contexto/inicio/model/menu.model';
import { MenuLateralService } from 'src/app/contexto/inicio/services/menu-lateral.service';

@Component({
  selector: 'component-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {

  public links: MenuModel[];

  @Output() menuLateralAbertoStatusInicial = new EventEmitter<boolean>();

  constructor(private readonly menuBusinessService: MenuLateralService,
              private readonly router: Router,
              private readonly _menuLateralService: MenuLateralService) {
    this.links = this.menuBusinessService.construirMenu();
   }

  ngOnInit(): void {
    this.redirecionarPrimeiroAcesso();
  }

  redirecionarPrimeiroAcesso(): void{
    const FezPrimeiroCadastro = localStorage.getItem(EParametroUsuario.PrimeiroCadastro);

    if (FezPrimeiroCadastro === "false" || isNullOrUndefined(FezPrimeiroCadastro)) {
      this.router.navigate(['/primeiro-cadastro/dados-pessoais']);
    }
  }

  onLinkClicado(){
    this._menuLateralService.clickLinkMenuSendEvent();
  }

}
