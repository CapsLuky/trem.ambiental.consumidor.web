export class UsuarioCadastroModel {
  public idUsuario: number;
  public nome: string;
  public email: string;
  public apelido: string;
  public idade: number;
  public genero: string | undefined;
  public idGenero: number;
  // public cep: string;
  // public condominio: string;

  constructor(idUsuario: number, nome: string, email: string, apelido: string, idade: number, genero: string | undefined, idGenero: number) {
    this.idUsuario = idUsuario;
    this.nome = nome;
    this.email = email;
    this.apelido = apelido;
    this.idade = idade;
    this.genero = genero;
    this.idGenero = idGenero;
    // this.cep = cep;
    // this.condominio = condominio;
  }
}
