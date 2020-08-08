export interface Orders{
    idPedido: string;
    idCompra: string;
    Productos: [];
    cantidad: number;
    subtotal: number;
    cubiertos: string;
    estado: string;
    idCliente: string;
}
