export class PesagemHistoricoFiltroModule {

  idUsuario: number;
  dataInicio:       Date;
  dataFim:          Date;

  constructor(idUsuario: number, dataInicio: Date, dataFim: Date){
    this.idUsuario = idUsuario;
    this.dataFim = dataFim;
    this.dataInicio = dataInicio;
  }
}
