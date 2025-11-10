export class ResetarSenhaFormModel {
  public novaSenha: string;
  public confirmarNovaSenha: string;

  constructor(novaSenha: string, confirmarNovaSenha: string) {
    this.novaSenha = novaSenha;
    this.confirmarNovaSenha = confirmarNovaSenha;
  }
}
