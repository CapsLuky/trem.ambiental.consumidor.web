import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./contexto/inicio/modules/inicio.module').then(module => module.InicioModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./contexto/autenticacao/modules/autenticacao.module').then(module => module.AutenticacaoModule),
  },
  {
    path: 'primeiro-cadastro',
    loadChildren: () => import('./contexto/cadastro/modules/dados-pessoais.module').then(module => module.DadosPessoaisModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
