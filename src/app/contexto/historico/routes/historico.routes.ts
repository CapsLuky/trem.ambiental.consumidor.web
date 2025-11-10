import { Routes } from '@angular/router';

import { EPermissaoAcesso } from '@EnumCommon';
import { RotaGuardService } from './../../../common/services/rota-guard.service';
import { RecicladoComponent } from '../pages/reciclado/reciclado.component';

export const RecicladoRoutes: Routes = [
  {
    path: '', component: RecicladoComponent,
    canActivate: [RotaGuardService],
    data: { permisoes: [EPermissaoAcesso.Parceiro] }
  }
];
