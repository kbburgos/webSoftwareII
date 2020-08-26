/**
 * @interface DeliverymanInterface
 * @public
 * @version 1.0.0
 * @desc DeliverymanInterface interface.
 * @author Danny Rios <dprios@espol.edu.ec>
 */

export interface Deliveryman{
    idRepartidor: string;
    cedula:string;
    nombre: string;
    apellido: string;
    telefono: string;
    pedidos: [];
}