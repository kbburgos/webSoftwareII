/**
 * @interface OrdersDispatchedInterface
 * @public
 * @version 1.0.0
 * @desc OrdersDispatchedInterface interface.
 * @author Danny Rios <dprios@espol.edu.ec>
 */
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