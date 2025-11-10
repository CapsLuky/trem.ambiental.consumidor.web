import { Injectable } from '@angular/core';

import { TokenModel } from '../models/token.model';
import { UsuarioInputModel } from '../models/usuarioInput.model';
import { IRequestResult } from './../../../common/Interfaces/IRequestResult';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenModel = new TokenModel(null);

  constructor() {
   }

  public criarSessao(result: IRequestResult<UsuarioInputModel>): void {
    this.logout();
    if (result.success) {
      localStorage.setItem('token', result.payload.accessToken);
      this.tokenModel = new TokenModel(result.payload.accessToken);
    }
  }

  public buscarToken(): string | null | undefined {
    return localStorage.getItem('token');
  }

  public buscarTokenModel(): TokenModel {
    const token = this.buscarToken();
    if(!token){
      return this.tokenModel;
    }

    this.tokenModel = new TokenModel(token);
    return this.tokenModel;
  }

  public logout(): void {
    localStorage.clear();
  }
}
