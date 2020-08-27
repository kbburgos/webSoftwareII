/**
 * @interface NovelyDelivermanView
 * @public
 * @version 1.0.0
 * @desc NovelyDelivermanView interface.
 * @author Brenda Bermello <bremiber@espol.edu.ec>
 */

import { Timestamp } from "rxjs/internal/operators/timestamp";

export interface NovelyDelivermanView{
    idNovedad?: string;
    idPedido?: string;
    idRepartidor: string;
    repartidor: string;
    novedad: string;
    idCliente: string;
    cliente: string;
    fecha?: any;
}