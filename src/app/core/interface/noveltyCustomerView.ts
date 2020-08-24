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