
import { Time } from "@angular/common";

/**
 * @interface NovelyDelivermanInterface
 * @public
 * @version 1.0.0
 * @desc NovelyDeliverman interface.
 * @author Danny Rios <dprios@espol.edu.ec>
 */
export interface NovelyDeliverman{
    idNovedad?: string;
    idPedido?: string;
    idRepartidor: string;
    novedad: string;
    idCliente: string;
    fecha?: Time;
}