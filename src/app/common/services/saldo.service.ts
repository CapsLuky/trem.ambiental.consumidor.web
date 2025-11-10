import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HandleErrorService } from '../../common/services/handle-error.service';
import { environment } from 'src/environments/environment';
import { IRequestResult } from 'src/app/common/Interfaces/IRequestResult';



@Injectable({
  providedIn: 'root'
})
export class SaldoService {

  private readonly urlPontuacao = `${environment.apiUrlBase}v1/Pontuacao`;

  constructor(private readonly _httpClient: HttpClient,
    private readonly _handleErro: HandleErrorService)
  { }

  public BuscarPontuacao(idUsuario: number): Observable<IRequestResult<number>> {

    const parametros = new HttpParams().set('idUsuario', idUsuario);

    return this._httpClient.get<IRequestResult<number>>(`${this.urlPontuacao}/Saldo`, {params: parametros})
    .pipe(
      catchError(errorRes => {
        return this._handleErro.handleError(errorRes);
      })
    );
  }
}
