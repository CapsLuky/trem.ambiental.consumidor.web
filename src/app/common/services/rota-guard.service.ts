import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AutenticacaoService } from './../../contexto/autenticacao/services/autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class RotaGuardService implements CanActivate {

  constructor(
    private readonly _router: Router,
    private readonly _autenticacaoService: AutenticacaoService) { }

    canActivate(activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (this._autenticacaoService.estaLogado()) {
          if (this._autenticacaoService.temAcesso(activatedRoute.data['permisoes'])) {
              return true;
          } else {
            this._router.navigate(['login'], { queryParams: { url: state.url }});
              return false;
          }
      } else {
          this._router.navigate(['login'], { queryParams: { url: state.url }});
          return false;
      }
  }
}
