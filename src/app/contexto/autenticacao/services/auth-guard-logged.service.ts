import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AutenticacaoService } from './autenticacao.service';


@Injectable()
export class AuthGuardLoggedService implements CanActivate {

  constructor(private readonly _router: Router,
              private readonly _autenticacaoService: AutenticacaoService) { }

    canActivate() {

    if (this._autenticacaoService.estaLogado()) {
      this._router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}
