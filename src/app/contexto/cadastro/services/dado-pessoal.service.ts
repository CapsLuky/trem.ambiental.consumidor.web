import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HandleErrorService } from '../../../common/services/handle-error.service';
import { IDadosUsuarioLogado } from '../models/IDadosUsuarioLogado';
import { UsuarioCadastroModel } from '../models/UsuarioCadastro.model';
import { AutenticacaoService } from '../../autenticacao/services/autenticacao.service';
import { IRequestResult } from '../../../common/Interfaces/IRequestResult';
import { ParametroUsuarioModel } from '../../../common/models/parametroUsuario.model';
import { EnderecoModel } from '../models/Endereco.model';

@Injectable({
  providedIn: 'root'
})
export class DadoPessoalService {

  private readonly urlCadastro = `${environment.apiUrlBase}v1/Cadastro/usuario/`;
  private readonly urlEndereco = `${environment.apiUrlBase}v1/Cadastro/endereco`;

  constructor(private readonly _httpClient: HttpClient,
              private readonly _autenticacao: AutenticacaoService,
              private readonly _handleErro: HandleErrorService) { }

  public buscarDadosUsuarioLogado(): Observable<IRequestResult<IDadosUsuarioLogado>> {
    const usuario = this._autenticacao.buscarInformacaoClienteLogado();
    return this._httpClient.get<IRequestResult<IDadosUsuarioLogado>>(`${this.urlCadastro}BuscarDadosAtualizacaoCadastro/${usuario.usuarioId}`)
    .pipe(
      catchError(errorRes => {
        return this._handleErro.handleError(errorRes);
      })
    );
  }

  public salvarDadosPessoais(usuarioCad: UsuarioCadastroModel): Observable<IRequestResult<boolean>>{
    return this._httpClient.put<IRequestResult<boolean>>(`${this.urlCadastro}AtualizarCadastro`, usuarioCad)
    .pipe(
      catchError(errorRes => {
        return this._handleErro.handleError(errorRes);
      })
    );
  }

  public salvarEndereco(endereco: EnderecoModel): Observable<IRequestResult<boolean>>{
    return this._httpClient.patch<IRequestResult<boolean>>(`${this.urlEndereco}`, endereco)
    .pipe(
      catchError(errorRes => {
        return this._handleErro.handleError(errorRes);
      })
    );
  }

  public salvarParametroUsuario(parametro: ParametroUsuarioModel): Observable<IRequestResult<boolean>>{
    return this._httpClient.patch<IRequestResult<boolean>>(`${this.urlCadastro}atualizarParametro`, parametro)
    .pipe(
      catchError(errorRes => {
        return this._handleErro.handleError(errorRes);
      })
    );
  }
}
