import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { isNullOrUndefined } from 'src/app/common/helper/util';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  public handleError(errorRes: HttpErrorResponse) {
    let mensagemErro;
    if(isNullOrUndefined(errorRes.statusText)){
      mensagemErro = errorRes.message;
    } else {
      mensagemErro = errorRes.error;
    }

    if(isNullOrUndefined(errorRes.status)){
      return of({
        success: false,
        payload: [],
        errors: [
          mensagemErro
        ],
        messages:[]
      });

    } else {
      return of({
        success: false,
        payload: errorRes.error.payload,
        errors: errorRes.error.errors,
        messages:[]
      });
    }
  }
}
