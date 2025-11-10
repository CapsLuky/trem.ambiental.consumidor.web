import { AutenticacaoService } from './../../../autenticacao/services/autenticacao.service';
import { HomeService } from './../../services/home.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { pipe, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'component-card-home-ranking',
  templateUrl: './card-home-ranking.component.html',
  styleUrls: ['./card-home-ranking.component.scss']
})
export class CardHomeRankingComponent implements OnInit, OnDestroy {

  private _destroySubscribes$ = new Subject<void>();

  public onRankingLoad = false;
  public pontosMesAtual = 0;
  public pontosMesAnterior = 0;
  private _clientId = 0;

  constructor(private readonly _notificao: NzNotificationService,
              private readonly _autenticacaoService: AutenticacaoService,
              private readonly _homeService: HomeService)
              {
                const usuarioLogado = this._autenticacaoService.buscarInformacaoClienteLogado();
                this._clientId = Number(usuarioLogado.usuarioId);
              }

  ngOnInit(): void {
    this.buscarRankingMesAtual();
    setTimeout(() => {
      this.buscarRankingMesAnterior();
    }, 500);
  }

  buscarRankingMesAtual() {
    this.onRankingLoad = true;
    this._homeService.BuscarPosicaoRanking(this._clientId, false)
      .pipe(
        takeUntil(this._destroySubscribes$),
        finalize(() => {
          this.onRankingLoad = false;
        })
      )
      .subscribe(
        (result) => {
          if(result.success){
            this.pontosMesAtual = result.payload;
            if (result.messages.length > 0)
              this._notificao.create(result.messages[0].tipo, result.messages[0].titulo, result.messages[0].mensagem);
          }
          else {
            this._notificao.error('Ops', 'Tivemos um problema ao buscar sua posição', {nzDuration: 0});
          }
        }
      );
  }

  buscarRankingMesAnterior() {
    this.onRankingLoad = true;
    this._homeService.BuscarPosicaoRanking(this._clientId, true)
      .pipe(
        takeUntil(this._destroySubscribes$),
        finalize(() => {
          this.onRankingLoad = false;
        })
      )
      .subscribe(
        (result) => {
          if(result.success){
            this.pontosMesAnterior = result.payload;
            if (result.messages.length > 0)
              this._notificao.create(result.messages[0].tipo, result.messages[0].titulo, result.messages[0].mensagem);
          }
          else {
            this._notificao.error('Ops', 'Tivemos um problema ao buscar sua posição', {nzDuration: 0});
          }
        }
      );
  }


  ngOnDestroy() {
    this._destroySubscribes$.next();
    this._destroySubscribes$.complete();
  }

}
