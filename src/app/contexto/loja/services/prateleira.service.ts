import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IProduto } from '../models/IProduto';
import { HandleErrorService } from '../../../common/services/handle-error.service';
import { environment } from 'src/environments/environment';
import { IRequestResult } from 'src/app/common/Interfaces/IRequestResult';
import { PedidoItemModel } from '../models/PedidoItem.model';



@Injectable({
  providedIn: 'root'
})
export class PrateleiraService {

  private readonly urlCatalogo = `${environment.apiUrlBase}v1/Catalogo/`;
  private readonly urlCarrinho = `${environment.apiUrlBase}v1/Carrinho/`;

  constructor(private readonly _httpClient: HttpClient,
              private readonly _handleErro: HandleErrorService)
  { }

  public buscarProdutosDaLoja() : Observable<IRequestResult<Array<IProduto>>> {

    return this._httpClient.get<IRequestResult<Array<IProduto>>>(`${this.urlCatalogo}Produto/app`)
    .pipe(
      catchError(errorRes => {
        return this._handleErro.handleError(errorRes);
      })
    );
  }

  public enviarItemParaCarrinho(pedidoItem: PedidoItemModel) : Observable<IRequestResult<boolean>> {

    return this._httpClient.post<IRequestResult<boolean>>(`${this.urlCarrinho}enviarItemParaCarrinho`, pedidoItem)
    .pipe(
      catchError(errorRes => {
        return this._handleErro.handleError(errorRes);
      })
    );
  }
}
