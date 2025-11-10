import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HandleErrorService } from '../../../common/services/handle-error.service';
import { IRequestResult } from '../../../common/Interfaces/IRequestResult';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private readonly urlPontuacao = `${environment.apiUrlBase}v1/Pontuacao`;

  constructor(private readonly _httpClient: HttpClient,
              private readonly _handleErro: HandleErrorService) { }

  public BuscarPosicaoRanking(idUsuario: number, mesAnterior: boolean): Observable<IRequestResult<number>> {
    return this._httpClient.get<IRequestResult<number>>(`${this.urlPontuacao}/BuscarPosicaoRanking?idUsuario=${idUsuario}&mesAnterior=${mesAnterior}`)
    .pipe(
      catchError(errorRes => {
        return this._handleErro.handleError(errorRes);
      })
    );
  }
}
