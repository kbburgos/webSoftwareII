/**
 * @interface NovelyCustomerView
 * @public
 * @version 1.0.0
 * @desc NovelyCustomerView interface.
 * @author Brenda Bermello <bremiber@espol.edu.ec>
 */

import { Timestamp } from "rxjs/internal/operators/timestamp";
import { Time } from "@angular/common";

export interface NovelyCustomerView{
    idNovedad?: string;
    idPedido?: string;
    idRepartidor: string;
    novedad: string;
    idCliente: string;
    fecha?: Time;
    nombre: string;
    apellido: string;
    email: string;
    direccion: string;
    rol: number;
    telefono: string;
}