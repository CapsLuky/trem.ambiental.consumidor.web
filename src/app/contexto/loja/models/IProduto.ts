export interface IProdutoTipo {
  valor: number;
  nome: string;
}

export interface IProduto {
    id: number;
    nome: string;
    descricao?: string;
    ativo: boolean;
    valorPontos: number;
    dataCadastro: string;
    imagem: string;
    quantidadeEstoque: number;
    quantidadeEstoqueBaixo: number;
    validade: number;
    tipo: IProdutoTipo;
}

