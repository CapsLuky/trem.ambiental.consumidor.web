import { CanDeactivateGuard } from './../../../common/services/can-deactivate-guard.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { DadosPessoaisComponent } from '../pages/dados-pessoais/dados-pessoais.component';
import { DadosPessoaisRoutes } from '../routes/dados-pessoais.route';
import { CpfPipe } from './../../../common/helper/cpf.pipe';




@NgModule({
  declarations: [
    DadosPessoaisComponent,
    CpfPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(DadosPessoaisRoutes),
    NzStepsModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NzInputNumberModule,
    NzSelectModule,
    NzNotificationModule,
    NgxMaskModule.forRoot(),
    NzSpinModule
  ],
  providers: [
    CanDeactivateGuard
  ]
})
export class DadosPessoaisModule { }
