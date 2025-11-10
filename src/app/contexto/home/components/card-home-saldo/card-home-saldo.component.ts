import { SaldoService } from './../../../../common/services/saldo.service';
import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject } from 'rxjs';
import { TokenService } from 'src/app/contexto/autenticacao/services/token.service';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'component-card-home-saldo',
  templateUrl: './card-home-saldo.component.html',
  styleUrls: ['./card-home-saldo.component.scss']
})
export class CardHomeSaldoComponent implements OnInit {

  public pontos = 0;
  public idUsuario = 0;
  public onPontosLoad = true;

  private _destroySubscribes$ = new Subject<void>();

  constructor(private readonly _saldoService: SaldoService,
              private readonly _tokenService: TokenService,
              private readonly _notificao: NzNotificationService) {
    const tokenModel = this._tokenService.buscarTokenModel();
    this.idUsuario = Number(tokenModel.usuarioId)
   }

  ngOnInit(): void {
    this.buscarPontuacaoUsuario();
  }

  buscarPontuacaoUsuario(){
    this.onPontosLoad = true;

    this._saldoService.BuscarPontuacao(this.idUsuario)
    .pipe(
      takeUntil(this._destroySubscribes$),
      finalize(() => {
        this.onPontosLoad = false;
      })
    )
    .subscribe((result) => {
      if (result.success) {
        this.pontos = result.payload;
        if (result.messages.length > 0)
              this._notificao.create(result.messages[0].tipo, result.messages[0].titulo, result.messages[0].mensagem);
      } else {
        this._notificao.error('ERRO', result.errors[0].mensagem, {nzDuration: 0});
      }
    });
  }

  ngOnDestroy() {
    this._destroySubscribes$.next();
    this._destroySubscribes$.complete();
  }

}
