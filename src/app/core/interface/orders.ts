import { Timestamp } from "rxjs/internal/operators/timestamp";

export interface Orders{
    idPedido: string;
    idUsuario: string;
    productos: string[];
    cantidades: number[];
    totalProductos: number;
    cubiertos: boolean;
    isEfectivo: boolean;
    tipoEntrega: boolean;
    estadoDelPedido: number;
    horaDeRetiro: Timestamp<Date>;
    direccionEntrega: {};

}
