export class PedidoItemModel {

  public IdUsuario: number;
  public IdProduto: number;
  public Quantidade: number;

  constructor(idUsuario: number, idProduto: number, quantidade: number) {
    this.IdUsuario = idUsuario;
    this.IdProduto = idProduto;
    this.Quantidade = quantidade;
  }
}
