export class UsuarioInputModel {

  id: number;
  nome: string;
  apelido: string;
  email: string;
  idade: number;
  genero: string;
  idGenero: number;
  perfil: string;
  idPerfil: number;
  accessToken: string;
  expiresIn: number;

  constructor(
    id: number,
    nome: string,
    apelido: string,
    email: string,
    idade: number,
    genero: string,
    idGenero: number,
    perfil: string,
    idPerfil: number,
    accessToken: string,
    expiresIn: number,
  ) {

    this.id = id;
    this.nome = nome;
    this.apelido = apelido;
    this.email = email;
    this.idade = idade;
    this.genero = genero;
    this.idGenero = idGenero;
    this.perfil = perfil;
    this.idPerfil = idPerfil;
    this.accessToken = accessToken;
    this.expiresIn = expiresIn;
  }

}
