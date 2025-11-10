export class TrocaSenhaModel {
  email: string;
  SenhaNova: string;
  tokenRedefinirSenha: string;

  constructor(email: string, SenhaNova: string, tokenRedefinirSenha: string) {
    this.email = email;
    this.SenhaNova = SenhaNova;
    this.tokenRedefinirSenha = tokenRedefinirSenha;
  }
}
