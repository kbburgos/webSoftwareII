/**
 * @interface OrdersInterface
 * @public
 * @version 1.0.0
 * @desc OrdersInterface interface.
 * @author Danny Rios <dprios@espol.edu.ec>
 */

export interface Orders{
    idPedido: string;
    idUsuario: string;
    productos: string[];
    cantidades: number[];
    total: number;
    cubiertos: boolean;
    isEfectivo: boolean;
    isDomicilio: boolean;
    estadoDelPedido: number;
    horaDeRetiro: any;
    direccionEntrega: {};

}
