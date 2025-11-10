export interface IPesagemHistorico {
  id: number;
  operador: string;
  cliente: string;
  reciclavel: string;
  peso: number;
  ponto: number;
  dataLancamento: string;
  cancelado: boolean;
  dataCancelado: string;
}
