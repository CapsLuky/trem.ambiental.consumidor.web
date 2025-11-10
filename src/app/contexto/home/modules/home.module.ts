import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { HomeComponent } from '../pages/home/home.component';
import { HomeRoutes } from '../routes/home.routes';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { CardHomeRankingComponent } from '../components/card-home-ranking/card-home-ranking.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CardHomeSaldoComponent } from '../components/card-home-saldo/card-home-saldo.component';

@NgModule({
  declarations: [
    HomeComponent,
    CardHomeRankingComponent,
    CardHomeSaldoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    NzNotificationModule,
    NzCardModule,
    NzSpinModule,
    NzTypographyModule,
    NzDividerModule
  ]
})
export class HomeModule { }
