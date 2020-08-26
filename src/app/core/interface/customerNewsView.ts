export interface CustomerNewsView{
    idnovedad?: string;
    idUsuarioreporta: string;
    usuarioReporta: string;
    idUsuarioreportado: string;
    usuarioReportado: string;
    descripcion: string;
    createdAt?: Date;
    updatedAt?: Date;
    esCliente?: boolean;
}