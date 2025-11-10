import { Routes } from '@angular/router';

import { RotaGuardService } from './../../../common/services/rota-guard.service';
import { DadosPessoaisComponent } from '../pages/dados-pessoais/dados-pessoais.component';

export const DadosPessoaisRoutes: Routes = [
  { path: 'dados-pessoais', component: DadosPessoaisComponent,
    canActivate: [RotaGuardService]
  }
];
