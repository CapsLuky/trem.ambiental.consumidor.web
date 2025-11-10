import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  imports: [
    CommonModule,
    NzGridModule,
    NzModalModule
  ],
  exports: [
    NzGridModule,
    NzModalModule
  ]
})
export class commonModule { }
