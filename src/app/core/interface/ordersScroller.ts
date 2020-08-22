export interface OrdersScroller {
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
    color;
}