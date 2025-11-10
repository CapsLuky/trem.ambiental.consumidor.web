export class ParametroUsuarioModel {
  public idUsuario: number;
  public parametro: string;
  public valor: boolean;

  constructor(idUsuario: number, parametro: string, valor: boolean){
    this.idUsuario = idUsuario,
    this.parametro = parametro ,
    this.valor = valor
  }
}
