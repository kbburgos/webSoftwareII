import { Timestamp } from "rxjs/internal/operators/timestamp";

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
