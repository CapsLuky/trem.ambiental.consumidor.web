import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { NzNotificationService } from 'ng-zorro-antd/notification';

import { CarrinhoService } from './../../services/carrinho.service';
import { ICarrinho } from './../../models/ICarrinho';
import { TokenService } from '../../../autenticacao/services/token.service';
import { PedidoItemModel } from '../../models/PedidoItem.model';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit, OnDestroy {

  private _timer = 0;
  public carrinho: ICarrinho = { idPedido: 0, idUsuario: 0, valorTotal: 0, validade: '', items: [] };
  public onBtnRemoverLoad = false;
  public onBtnFazerPedidoLoad = false;
  public onBuscarCarrinhoLoad = false;
  public quantidade = 1;
  public idUsuario = 0;

  public placeholder = '';
  public fallback = 'data:image/png;base64,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';

  private _destroySubscribes$ = new Subject<void>();

  constructor(private readonly _notificao: NzNotificationService,
    private readonly _tokenService: TokenService,
    private readonly _router: Router,
    private readonly _carrinhoService: CarrinhoService) {
    const tokenModel = this._tokenService.buscarTokenModel();
    this.idUsuario = Number(tokenModel.usuarioId);
  }

  ngOnInit(): void {
    this.buscarCarrinho();
  }

  private buscarCarrinho() {

    this.onBuscarCarrinhoLoad = true;
    this._carrinhoService.buscarCarrinho(this.idUsuario)
      .pipe(
        takeUntil(this._destroySubscribes$),
        finalize(() => {
          this.onBuscarCarrinhoLoad = false;
        })
      )
      .subscribe((result) => {
        if (result.success) {
          this.carrinho = result.payload;

          if(this.carrinho !== null) {
            this.carrinho.items.forEach(element => {
              element.imagem = '../../../../../assets/foto-produtos/' + element.idProduto + '.jpg'
            });
          }

          if (result.messages.length > 0)
            this._notificao.create(result.messages[0].tipo, result.messages[0].titulo, result.messages[0].mensagem);
        } else {
          this._notificao.error('ERRO', result.errors[0].mensagem, { nzDuration: 0 });
        }
      });
  }

  onBtnFazerPedido() {
    this.onBtnRemoverLoad = true;
    this.onBtnFazerPedidoLoad = true;
    this._carrinhoService.iniciarPedido(this.idUsuario)
      .pipe(
        takeUntil(this._destroySubscribes$),
        finalize(() => {
          this.onBtnRemoverLoad = false;
          this.onBtnFazerPedidoLoad = false;
        }),
      )
      .subscribe((result) => {
        if (result.success) {

          this.buscarCarrinho();

          if (result.messages.length > 0)
            this._notificao.create(result.messages[0].tipo, result.messages[0].titulo, result.messages[0].mensagem);
        } else {
          this._notificao.error('ERRO', result.errors[0].mensagem, { nzDuration: 0 });
        }
      });
  }

  onBtnRemoverItem(idProduto: number) {
    const item: PedidoItemModel = {
      IdProduto: idProduto,
      IdUsuario: this.idUsuario,
      Quantidade: 0
    }

    this.onBtnRemoverLoad = true;
    this.onBtnFazerPedidoLoad = true;
    this._carrinhoService.removerItemDoCarrinho(item)
      .pipe(
        takeUntil(this._destroySubscribes$),
        finalize(() => {
          this.onBtnRemoverLoad = false;
          this.onBtnFazerPedidoLoad = false;
        }),
      )
      .subscribe((result) => {
        if (result.success) {

          this.buscarCarrinho();

          if (result.messages.length > 0)
            this._notificao.create(result.messages[0].tipo, result.messages[0].titulo, result.messages[0].mensagem);
        } else {
          this._notificao.error('ERRO', result.errors[0].mensagem, { nzDuration: 0 });
        }
      });
  }

  onInputNumberAtualizarItem(quantidade: number, idProduto: number) {
    const item: PedidoItemModel = {
      IdProduto: idProduto,
      IdUsuario: this.idUsuario,
      Quantidade: quantidade
    }

    this.onBtnRemoverLoad = true;
    this.onBtnFazerPedidoLoad = true;

    clearTimeout(this._timer);

    this._timer = window.setTimeout(() => {

      this._carrinhoService.atualizarItem(item)
      .pipe(
        takeUntil(this._destroySubscribes$),
        finalize(() => {
          this.onBtnRemoverLoad = false;
          this.onBtnFazerPedidoLoad = false;
        }),
      )
      .subscribe((result) => {
        if (result.success) {
          this.buscarCarrinho();

          if (result.messages.length > 0)
            this._notificao.create(result.messages[0].tipo, result.messages[0].titulo, result.messages[0].mensagem);
        }
        else {
          this._notificao.error('ERRO', result.errors[0].mensagem, { nzDuration: 0 });
        }
      });

    }, 500);

  }

  ngOnDestroy() {
    this._destroySubscribes$.next();
    this._destroySubscribes$.complete();
  }

}
