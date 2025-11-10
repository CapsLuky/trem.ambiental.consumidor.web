import { ICarrinhoItem } from './ICarrinhoItem';

export interface ISituacaoPedido {
    idPedido: number;
    idUsuario: number;
    nomeUsuario: string;
    valorTotal: number;
    pedidoStatus: number;
    pedidoStatusNome: string;
    validade: string;
    dataPedido: string | null;
    items: ICarrinhoItem[];
}

