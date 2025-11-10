export class EnderecoModel {
  public idUsuario: number;
  public cep: string;
  public condominio: string;

  constructor(idUsuario: number, cep: string, condominio: string) {
    this.idUsuario = idUsuario;
    this.cep = cep;
    this.condominio = condominio;
  }
}
