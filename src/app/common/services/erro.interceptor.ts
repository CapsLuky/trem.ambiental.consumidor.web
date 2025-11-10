import { Injectable, NgModule } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { isNullOrUndefined } from '../helper/util';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class HttpErroInterceptor implements HttpInterceptor {

// NÃO ESTÁ USANDO, NÃO CONSEGUI FAZER FUNCIONAR DIREITO.
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(

          catchError(errorRes => {
            return this.handleError(errorRes);
          })


    ) as Observable<HttpEvent<any>>;
  }

  private handleError(errorRes: HttpErrorResponse) {
    let mensagemErro;

    if (errorRes.error instanceof ErrorEvent) {
      mensagemErro = `Error: ${errorRes.error.message}`;
      return of({
        success: false,
        payload: [],
        errors: [
          mensagemErro
        ]
      });
    }
    else{

      if(isNullOrUndefined(errorRes.statusText)){
        mensagemErro = errorRes.message;
      } else if (errorRes.error instanceof Array) {
        mensagemErro = errorRes.error;
      }

      if(isNullOrUndefined(errorRes.status)){
        return of({
          success: false,
          payload: [],
          errors: [
            mensagemErro
          ]
        });

      } else {
        return of({
          success: false,
          payload: errorRes.error.payload,
          errors: errorRes.error.errors
        });
      }
    }
  }
}

@NgModule({
  providers: [{
     provide: HTTP_INTERCEPTORS,
     useClass: HttpErroInterceptor,
     multi: true,
  }]
})

export class ErroInterceptor { }
