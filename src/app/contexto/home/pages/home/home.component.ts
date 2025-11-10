import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';

import { NzNotificationService } from 'ng-zorro-antd/notification';

import { TokenService } from './../../../autenticacao/services/token.service';
import { HomeService } from './../../services/home.service';

@Component({
  selector: 'page-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  pontos = 0;
  idUsuario = 0;

  private _destroySubscribes$ = new Subject<void>();

  constructor(private readonly _homeService: HomeService,
              private readonly _notificao: NzNotificationService,
              private readonly _tokenService: TokenService) {
                const tokenModel = this._tokenService.buscarTokenModel();
                this.idUsuario = Number(tokenModel.usuarioId);
              }

  ngOnInit(): void {
    //this.buscarPontuacaoUsuario();
  }

  // buscarPontuacaoUsuario(){

  //   this.pontuacaoFiltro = new PontuacaoFiltroModule(this.idUsuario);

  //   this._homeService.BuscarPontuacao(this.pontuacaoFiltro)
  //   .pipe(takeUntil(this._destroySubscribes$))
  //   .subscribe((result) => {
  //     if (result.success) {
  //       this.pontos = result.payload;
  //       if (result.messages.length > 0)
  //             this._notificao.create(result.messages[0].tipo, result.messages[0].titulo, result.messages[0].mensagem);
  //     } else {
  //       this._notificao.error('ERRO', result.errors[0].mensagem, {nzDuration: 0});
  //     }
  //   });
  // }

  ngOnDestroy() {
    this._destroySubscribes$.next();
    this._destroySubscribes$.complete();
  }

}
