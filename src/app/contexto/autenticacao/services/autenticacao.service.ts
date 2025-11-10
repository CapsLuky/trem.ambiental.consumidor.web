import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HandleErrorService } from '../../../common/services/handle-error.service';
import { TokenModel } from './../models/token.model';
import { EPermissaoAcesso } from '@EnumCommon';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';
import { UsuarioOutputModel } from '../models/usuarioOutput.model';
import { IRequestResult } from 'src/app/common/Interfaces/IRequestResult';
import { UsuarioInputModel } from '../models/usuarioInput.model';
import { TrocaSenhaModel } from '../models/troca-senha.model';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private readonly urlAutenticacaoLogin = `${environment.apiUrlBase}v1/Autenticacao/login`;
  private readonly urlVerificarCompletarCadastro = `${environment.apiUrlBase}v1/Cadastro/usuario/completarCadastro/`;

  constructor(private readonly _httpClient: HttpClient,
              private readonly _tokenService: TokenService,
              private readonly _handleErro: HandleErrorService) { }

  public logar(usuario: UsuarioOutputModel): Observable<IRequestResult<UsuarioInputModel>> {
    return this._httpClient.post<IRequestResult<UsuarioInputModel>>(this.urlAutenticacaoLogin, usuario )
    .pipe(
      map(result => {
        this._tokenService.criarSessao(result);
        return result;
      }),
      catchError(errorRes => {
        return this._handleErro.handleError(errorRes);
      })
    );
  }

  public logout(): void {
    localStorage.clear();
  }

  public alterarSenha(senhaAtual: string, senhaNova: string): Observable<IRequestResult<boolean>> {
    const tokenModel = this.buscarInformacaoClienteLogado();

    const altSenha = {
      email: tokenModel.email,
      senhaAtual: senhaAtual,
      senhaNova: senhaNova
    }

    return this._httpClient.post<IRequestResult<boolean>>(`${this.urlAutenticacaoLogin}/alterarsenha`, altSenha )
    .pipe(
      catchError(errorRes => {
        return this._handleErro.handleError(errorRes);
      })
    );
  }

  public enviarSenhaPorEmail(email: string): Observable<IRequestResult<boolean>> {
  return this._httpClient.get<IRequestResult<boolean>>(`${this.urlAutenticacaoLogin}/recriarSenha/${email}`)
    .pipe(
      catchError(errorRes => {
        return this._handleErro.handleError(errorRes);
      })
    );
  }

  public validarLinkTrocaDeSenha(token: string): Observable<IRequestResult<string>> {
    return this._httpClient.get<IRequestResult<string>>(`${this.urlAutenticacaoLogin}/validarToken/${token}`)
    .pipe(
      catchError(errorRes => {
        return this._handleErro.handleError(errorRes);
      })
    );
  }

  public redefinirSenha(trocaSenha: TrocaSenhaModel): Observable<IRequestResult<boolean>> {
    return this._httpClient.post<IRequestResult<boolean>>(`${this.urlAutenticacaoLogin}/redefinirSenha`, trocaSenha)
    .pipe(
      catchError(errorRes => {
        return this._handleErro.handleError(errorRes);
      })
    );
  }

  public temAcesso(permissions: Array<string>): boolean {
    let tokenModel = this._tokenService.buscarTokenModel();

    if (!permissions) {
        return true;
    }

    if (!this.estaLogado()) {
        return false;
    }

    let temAccess = false;

    if(tokenModel.role[0] === EPermissaoAcesso.Admin){
      return true;
    }

    permissions.forEach(permissacao => {
        if (tokenModel.role.includes(permissacao)) {
          temAccess = true;
        }
    });

    return temAccess;
  }

  public estaLogado(): boolean {
    let tokenModel = this._tokenService.buscarTokenModel();

    if (!tokenModel) {
      return false;
    }

    return tokenModel.isExpired === false;
  }

  public verificarPrimeiroCadastro(usuarioId: number): Observable<IRequestResult<boolean>> {
    return this._httpClient.get<IRequestResult<boolean>>(`${this.urlVerificarCompletarCadastro}${usuarioId}`)
    .pipe(
      catchError(errorRes => {
        return this._handleErro.handleError(errorRes);
      })
    );
  }

  public buscarInformacaoClienteLogado() : TokenModel{
    return this._tokenService.buscarTokenModel();
  }

}

