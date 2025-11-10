import { EStatusPedido } from './../../models/StatusPedido.enum';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { NzNotificationService } from 'ng-zorro-antd/notification';

import { TokenService } from '../../../autenticacao/services/token.service';
import { ISituacaoPedido } from '../../models/ISituacaoPedido';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit, OnDestroy {

  private _destroySubscribes$ = new Subject<void>();

  public onBuscarPedidoLoad = false;
  public pedidos: ISituacaoPedido[] = [];
  public idUsuario = 0;

  constructor(private readonly route: ActivatedRoute,
              private readonly _tokenService: TokenService,
              private readonly router: Router,
              private readonly _pedidoService: PedidoService,
              private readonly _notificao: NzNotificationService) {
    const tokenModel = this._tokenService.buscarTokenModel();
    this.idUsuario = Number(tokenModel.usuarioId);
  }

  ngOnInit(): void {
    this.buscarPedidosCliente();
  }

  private buscarPedidosCliente(){
    this.onBuscarPedidoLoad = true;
    this._pedidoService.buscarPedidos(this.idUsuario)
      .pipe(
        takeUntil(this._destroySubscribes$),
        finalize(() => {
          this.onBuscarPedidoLoad = false;
        })
      )
      .subscribe((result) => {
        if (result.success) {
          this.pedidos = result.payload

          this.pedidos.forEach(pedido => {
            switch (pedido.pedidoStatus) {
              case EStatusPedido.Cancelado:
                  pedido.pedidoStatusNome = "Cancelado";
              break;
              case EStatusPedido.EmAberto:
                  pedido.pedidoStatusNome = "Em Aberto";
              break;
              case EStatusPedido.Entregue:
                  pedido.pedidoStatusNome = "Entregue";
              break;
              case EStatusPedido.Expirado:
                  pedido.pedidoStatusNome = "Expirado";
              break;
              case EStatusPedido.Extornado:
                  pedido.pedidoStatusNome = "Extornado";
              break;
              case EStatusPedido.Rascunho:
                  pedido.pedidoStatusNome = "Rascunho";
              break;
              default:
                pedido.pedidoStatusNome = "";
                break;
            }


          });

          if (result.messages.length > 0)
            this._notificao.create(result.messages[0].tipo, result.messages[0].titulo, result.messages[0].mensagem);
        } else {
          this._notificao.error('ERRO', result.errors[0].mensagem, { nzDuration: 0 });
        }
      });
  }

  ngOnDestroy() {
    this._destroySubscribes$.next();
    this._destroySubscribes$.complete();
  }
}
