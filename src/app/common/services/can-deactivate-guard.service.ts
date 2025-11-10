import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  canDeactivate(component: CanComponentDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

}

/* COLOCAR ISSO NO COMPONENTE PARA ALERTAR ANTES DE SAIR DA PÁGINA
unSaved: boolean = true;
canDeactivate(): Observable<boolean> | boolean {

  if (this.unSaved) {

    const result = window.confirm('There are unsaved changes! Are you sure?');

      return of(result);
  }
  return true;
}


COLOCAR ISSO NA ROTA DO COMPONENT
canDeactivate: [CanDeactivateGuard]
*/
