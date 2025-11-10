import { PesagemHistoricoFiltroModule } from './../../models/PesagemHistoricoFiltro.module';
import { IPesagemHistorico } from './../../models/IPesagemHistorico';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { AutenticacaoService } from '../../../autenticacao/services/autenticacao.service';
import { RecicladoService } from '../../services/reciclado.service';

@Component({
  selector: 'page-reciclado',
  templateUrl: './reciclado.component.html',
  styleUrls: ['./reciclado.component.scss']
})
export class RecicladoComponent implements OnInit, OnDestroy {

  private _destroySubscribes$ = new Subject<void>();

  public pesagemHistoricoLista: IPesagemHistorico[] = [];
  public tabelaLoad: boolean = false;
  public dataInicio = new Date();
  public dataFim = new Date();
  public pesagemHistoricoFiltro!: PesagemHistoricoFiltroModule;
  public peso = 0;

  private _clientId = 0;

  constructor(private readonly _notificao: NzNotificationService,
              private readonly _autenticacaoService: AutenticacaoService,
              private readonly _recicladoService: RecicladoService)
              {
                const usuarioLogado = this._autenticacaoService.buscarInformacaoClienteLogado();
                this._clientId = Number(usuarioLogado.usuarioId);
                this.dataInicio.setDate(this.dataInicio.getDate()-30);
              }

  ngOnInit(): void {

    this.filtrarHistoricoPesagem();

  }

  filtrarHistoricoPesagem(){
      this.tabelaLoad = true;
      this.pesagemHistoricoFiltro = new PesagemHistoricoFiltroModule(this._clientId, this.dataInicio, this.dataFim);

      this._recicladoService.filtrarPontosEntreDatas(this.pesagemHistoricoFiltro)
      .pipe(
        takeUntil(this._destroySubscribes$)
      )
      .subscribe(
        (result) => {
          if(result.success){
            this.peso = result.payload;
            if (result.messages.length > 0)
              this._notificao.create(result.messages[0].tipo, result.messages[0].titulo, result.messages[0].mensagem);
          }
          else {
            this._notificao.error('ERRO', 'Tivemos um problema ao buscar os pontos', {nzDuration: 0});
          }
        }
      );

      this._recicladoService.filtrarHistoricoPesagem(this.pesagemHistoricoFiltro)
      .pipe(
        takeUntil(this._destroySubscribes$),
        finalize(() => {
          this.tabelaLoad = false;
        })
      )
      .subscribe(
        (resp) => {
          if(!resp.success){
            this._notificao.error('ERRO', 'Tivemos um problema ao buscar os dados', {nzDuration: 0});
          }
          else {
            this.pesagemHistoricoLista = resp.payload;
          }
        }
      );
  }

  ngOnDestroy() {
    this._destroySubscribes$.next();
    this._destroySubscribes$.complete();
  }
}
