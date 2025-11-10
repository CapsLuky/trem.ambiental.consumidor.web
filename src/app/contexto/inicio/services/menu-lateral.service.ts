import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MenuModel, SubMenuModel } from '../model/menu.model';

import { AutenticacaoService } from './../../autenticacao/services/autenticacao.service';
import { EPermissaoAcesso } from '@EnumCommon';

@Injectable({
  providedIn: 'root'
})
export class MenuLateralService {
  menu = new Array<MenuModel>();
  private subject = new Subject<any>();

  constructor(private readonly _autenticacaoService: AutenticacaoService) { }

  construirMenu() {
    return this.menu = [
      {
        label: 'Home',
        visualizar: true,
        subMenu: [
          {
            label: 'Resumo',
            url: '/home',
            parentId: '',
            inativo: false,
            visualizar: true,
          },
        ] as SubMenuModel[]
      },
      {
        label: 'Histórico',
        visualizar: this._autenticacaoService.temAcesso([EPermissaoAcesso.Parceiro]),
        subMenu: [
          {
            label: 'Reciclados',
            url: '/reciclado',
            parentId: '',
            inativo: false,
            visualizar: true,
          },
        ] as SubMenuModel[]
      },
      {
        label: 'Loja',
        visualizar: this._autenticacaoService.temAcesso([EPermissaoAcesso.Consumidor]),
        subMenu: [
          {
            label: 'Prateleira',
            url: '/loja/prateleira',
            parentId: '',
            inativo: false,
            visualizar: true,
          },
          {
            label: 'Carrinho',
            url: '/loja/carrinho',
            parentId: '',
            inativo: false,
            visualizar: true,
          },
          {
            label: 'Meus pedidos',
            url: '/loja/pedido',
            parentId: '',
            inativo: false,
            visualizar: true,
          }
        ] as SubMenuModel[]
      }
    ];
  }

  clickLinkMenuSendEvent() {
    this.subject.next();
  }

  clickLinkGetEvent() {
    return this.subject.asObservable();
  }
}
