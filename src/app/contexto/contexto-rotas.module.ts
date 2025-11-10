import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/page/inicio/inicio.component';

const contextoRotas: Routes = [
  {
    path: '', component: InicioComponent, children:
    [
      {
        path: '',
        loadChildren: () =>
        import('src/app/contexto/home/modules/home.module').then(module => module.HomeModule)
      },
      {
        path: 'loja',
        loadChildren: () =>
        import('src/app/contexto/loja/modules/loja.module').then(module => module.LojaModule)
      },
      {
        path: 'cadastro',
        loadChildren: () =>
        import('src/app/contexto/cadastro/modules/dados-pessoais.module').then(module => module.DadosPessoaisModule)
      },
      {
        path: 'reciclado',
        loadChildren: () =>
        import('src/app/contexto/historico/modules/reciclado.module').then(module => module.RecicladoModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(contextoRotas)
  ],
  exports:[RouterModule]
})
export class ContextoRotasModule { }
