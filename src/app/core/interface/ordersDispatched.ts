export interface OrdersDispatched{
    idpedido?: number;
    idcompra?: number;
    idproducto: string;
    cantidad: number;
    subtotal: number;
    cubiertos: boolean;
    estado: number;
    compra?: {};
  }