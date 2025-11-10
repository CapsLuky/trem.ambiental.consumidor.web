import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PesagemHistoricoFiltroModule } from '../models/PesagemHistoricoFiltro.module';
import { HandleErrorService } from '../../../common/services/handle-error.service';
import { environment } from 'src/environments/environment';
import { IPesagemHistorico } from '../models/IPesagemHistorico';
import { IRequestResult } from 'src/app/common/Interfaces/IRequestResult';

@Injectable({
  providedIn: 'root'
})
export class RecicladoService {

  private readonly urlPesagem = `${environment.apiUrlBase}v1/Pesagem/`;

  constructor(private readonly _httpClient: HttpClient,
              private readonly _handleErro: HandleErrorService)
  { }

  public filtrarHistoricoPesagem(filtro: PesagemHistoricoFiltroModule) : Observable<IRequestResult<Array<IPesagemHistorico>>> {

    const historicoPesagem = 'HistoricoPesagemEntreData';

    return this._httpClient.post<IRequestResult<Array<IPesagemHistorico>>>(`${this.urlPesagem}${historicoPesagem}`, filtro)
    .pipe(
      catchError(errorRes => {
        return this._handleErro.handleError(errorRes);
      })
    );
  }

  public filtrarPontosEntreDatas(filtro: PesagemHistoricoFiltroModule) : Observable<IRequestResult<number>>{

    return this._httpClient.post<IRequestResult<number>>(`${this.urlPesagem}Peso`, filtro)
    .pipe(
      catchError(errorRes => {
        return this._handleErro.handleError(errorRes);
      })
    );
  }

}
