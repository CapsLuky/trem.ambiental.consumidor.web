import { ICarrinhoItem } from './ICarrinhoItem';

export interface ICarrinho {
    idPedido: number;
    idUsuario: number;
    valorTotal: number;
    validade: string;
    items: ICarrinhoItem[];
}
