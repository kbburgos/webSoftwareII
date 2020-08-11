import { Timestamp } from "rxjs/internal/operators/timestamp";
import { Time } from "@angular/common";

export interface NovelyDeliverman{
    idNovedad?: string;
    idPedido?: string;
    idRepartidor: string;
    novedad: string;
    idCliente: string;
    fecha?: Time;
}