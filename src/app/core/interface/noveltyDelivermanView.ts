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