import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HandleErrorService } from '../../../common/services/handle-error.service';
import { environment } from 'src/environments/environment';
import { IRequestResult } from 'src/app/common/Interfaces/IRequestResult';
import { ISituacaoPedido } from '../models/ISituacaoPedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private readonly urlCarrinho = `${environment.apiUrlBase}v1/Carrinho/`;

  constructor(private readonly _httpClient: HttpClient,
              private readonly _handleErro: HandleErrorService)
  { }

  public buscarPedidos(idUsuario: number): Observable<IRequestResult<Array<ISituacaoPedido>>> {
    return this._httpClient.get<IRequestResult<Array<ISituacaoPedido>>>(`${this.urlCarrinho}historicoDePedido/${idUsuario}`)
    .pipe(
      catchError(errorRes => {
        return this._handleErro.handleError(errorRes);
      })
    );
  }
}
