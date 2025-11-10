import { Routes } from '@angular/router';

import { RotaGuardService } from './../../../common/services/rota-guard.service';
import { HomeComponent } from '../pages/home/home.component';

export const HomeRoutes: Routes = [
  { path: 'home', component: HomeComponent,
    canActivate: [RotaGuardService]
  }
];
