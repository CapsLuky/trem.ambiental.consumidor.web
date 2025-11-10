import { Routes } from '@angular/router';

import { RotaGuardService } from '../../../common/services/rota-guard.service';
import { CarrinhoComponent } from '../pages/carrinho/carrinho.component';
import { PrateleiraComponent } from '../pages/prateleira/prateleira.component';
import { PedidoComponent } from '../pages/pedido/pedido.component';
import { EPermissaoAcesso } from '@EnumCommon';

export const LojaRoutes: Routes = [
  { path: 'prateleira', component: PrateleiraComponent,
    canActivate: [RotaGuardService],
    data: { permisoes: [EPermissaoAcesso.Consumidor] }
  },
  { path: 'carrinho', component: CarrinhoComponent,
    canActivate: [RotaGuardService],
    data: { permisoes: [EPermissaoAcesso.Consumidor] }
  },
  { path: 'pedido', component: PedidoComponent,
    canActivate: [RotaGuardService],
    data: { permisoes: [EPermissaoAcesso.Consumidor] }
  }
];
