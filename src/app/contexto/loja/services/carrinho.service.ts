import { ICarrinho } from '../models/ICarrinho';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HandleErrorService } from '../../../common/services/handle-error.service';
import { environment } from 'src/environments/environment';
import { IRequestResult } from 'src/app/common/Interfaces/IRequestResult';
import { PedidoItemModel } from '../models/PedidoItem.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

    private readonly urlCarrinho = `${environment.apiUrlBase}v1/Carrinho/`;

  constructor(private readonly _httpClient: HttpClient,
              private readonly _handleErro: HandleErrorService)
  { }

  public buscarCarrinho(idUsuario: number): Observable<IRequestResult<ICarrinho>> {
    return this._httpClient.get<IRequestResult<ICarrinho>>(`${this.urlCarrinho}meuCarrinho/${idUsuario}`)
    .pipe(
      catchError(errorRes => {
        return this._handleErro.handleError(errorRes);
      })
    );
  }

  public removerItemDoCarrinho(item: PedidoItemModel): Observable<IRequestResult<boolean>> {
    return this._httpClient.post<IRequestResult<boolean>>(`${this.urlCarrinho}removerItem`, item)
    .pipe(
      catchError(errorRes => {
        return this._handleErro.handleError(errorRes);
      })
    );
  }

  public atualizarItem(item: PedidoItemModel): Observable<IRequestResult<boolean>> {
    return this._httpClient.post<IRequestResult<boolean>>(`${this.urlCarrinho}AtualizarItem`, item)
    .pipe(
      catchError(errorRes => {
        return this._handleErro.handleError(errorRes);
      })
    );
  }

  public iniciarPedido(idUsuario: number): Observable<IRequestResult<boolean>> {
    return this._httpClient.post<IRequestResult<boolean>>(`${this.urlCarrinho}iniciarPedido?idUsuario=${idUsuario}`, null)
    .pipe(
      catchError(errorRes => {
        return this._handleErro.handleError(errorRes);
      })
    );
  }
}
