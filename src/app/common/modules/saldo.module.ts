import { NzCardModule } from 'ng-zorro-antd/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzSpinModule } from 'ng-zorro-antd/spin';

import { CardSaldoComponent } from '../components/card-saldo/card-saldo.component';


@NgModule({
  declarations: [
    CardSaldoComponent
  ],
  imports: [
    CommonModule,
    NzCardModule,
    NzSpinModule
  ],
  exports: [
    CardSaldoComponent
  ]
})
export class SaldoModule { }
