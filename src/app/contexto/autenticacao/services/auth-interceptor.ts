import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';

import { TokenService } from './token.service';

@Injectable()
export class HttpsRequestInterceptor  implements HttpInterceptor {

  constructor(private readonly _tokenService: TokenService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this._tokenService.buscarToken();

    if (token) {

      const cloned = req.clone({
        headers: req.headers.set('content-type', 'application/json')
                            .set('Authorization', 'Bearer ' + token)
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}

@NgModule({
  providers: [{
     provide: HTTP_INTERCEPTORS,
     useClass: HttpsRequestInterceptor,
     multi: true,
  }]
})
export class AuthInterceptor { }
