import { RecicladoRoutes } from './../routes/historico.routes';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { RecicladoComponent } from '../pages/reciclado/reciclado.component';



@NgModule({
  declarations: [
    RecicladoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(RecicladoRoutes),
    NzGridModule,
    NzTableModule,
    NzDatePickerModule
  ]
})
export class RecicladoModule { }
