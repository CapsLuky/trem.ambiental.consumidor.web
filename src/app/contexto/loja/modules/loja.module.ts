import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { SaldoModule } from 'src/app/common/modules/saldo.module';
import { LojaRoutes } from './../routes/loja.routes';
import { PrateleiraComponent } from '../pages/prateleira/prateleira.component';
import { CarrinhoComponent } from '../pages/carrinho/carrinho.component';
import { PedidoComponent } from '../pages/pedido/pedido.component';



@NgModule({
  declarations: [
    PrateleiraComponent,
    CarrinhoComponent,
    PedidoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LojaRoutes),
    NzNotificationModule,
    NzCardModule,
    NzButtonModule,
    NzAvatarModule,
    NzImageModule,
    NzTypographyModule,
    SaldoModule,
    NzInputNumberModule,
    NzIconModule,
    FormsModule,
    NzSpinModule
  ]
})
export class LojaModule { }


