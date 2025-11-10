import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

import { ContextoRotasModule } from '../../contexto-rotas.module';

import { InicioComponent } from '../page/inicio/inicio.component';
import { MenuSuperiorComponent } from '../../../common/components/menu-superior/menu-superior.component';
import { MenuLateralComponent } from '../../../common/components/menu-lateral/menu-lateral.component';

@NgModule({
  declarations: [
    InicioComponent,
    MenuSuperiorComponent,
    MenuLateralComponent
  ],
  imports: [
    CommonModule,
    ContextoRotasModule,
    NzLayoutModule,
    NzDropDownModule,
    NzAvatarModule,
    NzButtonModule,
    NzIconModule,
    NzNotificationModule
  ]
})
export class InicioModule { }
