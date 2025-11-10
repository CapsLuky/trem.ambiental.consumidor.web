export interface IDadosUsuarioLogado {
  idUsuario: number;
  nome: string;
  email: string;
  apelido: string;
  idade: number;
  genero: string;
  idGenero: number;
  cep: string;
  condominio: string;

  // constructor(nome: string, email: string, apelido: string, idade: number, genero: string, cep: string, condominio: string) {
  //   this.nome = nome;
  //   this.email = email;
  //   this.apelido = apelido;
  //   this.idade = idade;
  //   this.genero = genero;
  //   this.cep = cep;
  //   this.condominio = condominio;
  // }
}
