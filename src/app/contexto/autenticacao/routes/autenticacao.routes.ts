import { Routes } from '@angular/router';

import { LoginComponent } from '../pages/login/login.component';
import { RecuperarSenhaComponent } from '../pages/recuperar-senha/recuperar-senha.component';
import { ResetarSenhaComponent } from '../pages/resetar-senha/resetar-senha.component';
import { TrocarSenhaComponent } from '../pages/trocar-senha/trocar-senha.component';
import { AuthGuardLoggedService } from '../services/auth-guard-logged.service';
import { AuthGuardTrocaSenhaService } from '../services/auth-guard-troca-senha.service';

export const AutenticacaoRoutes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AuthGuardLoggedService] },
  { path: 'trocar-senha', component: TrocarSenhaComponent, canActivate: [AuthGuardTrocaSenhaService] },
  { path: 'recuperar-senha', component: RecuperarSenhaComponent },
  { path: 'resetar-senha/:token', component: ResetarSenhaComponent },
];
