import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AutenticacaoService } from './autenticacao.service';

@Injectable()
export class AuthGuardTrocaSenhaService implements CanActivate {

  constructor(private readonly _autenticacaoService: AutenticacaoService,
              private readonly _router: Router) { }

    canActivate() {

    if (this._autenticacaoService.estaLogado()) {
      return true;
    } else {
      this._router.navigate(['login']);
      return false;
    }
  }
}
