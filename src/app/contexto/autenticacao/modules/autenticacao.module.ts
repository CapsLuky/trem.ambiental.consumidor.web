import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { LoginComponent } from '../pages/login/login.component';
import { AutenticacaoRoutes } from '../routes/autenticacao.routes';
import { AuthGuardLoggedService } from '../services/auth-guard-logged.service';
import { TrocarSenhaComponent } from '../pages/trocar-senha/trocar-senha.component';
import { AuthGuardTrocaSenhaService } from '../services/auth-guard-troca-senha.service';
import { RecuperarSenhaComponent } from '../pages/recuperar-senha/recuperar-senha.component';
import { ResetarSenhaComponent } from './../pages/resetar-senha/resetar-senha.component';

@NgModule({
  declarations: [
    LoginComponent,
    TrocarSenhaComponent,
    RecuperarSenhaComponent,
    ResetarSenhaComponent
  ],
  imports: [
    RouterModule.forChild(AutenticacaoRoutes),
    CommonModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzIconModule,
    NzSpinModule
  ],
  providers: [AuthGuardLoggedService, AuthGuardTrocaSenhaService]
})
export class AutenticacaoModule { }
