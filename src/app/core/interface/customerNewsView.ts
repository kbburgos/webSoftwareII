/**
 * @interface CustomerNewsView
 * @public
 * @version 1.0.0
 * @desc CustomerNewsView interface.
 * @author Brenda Bermello <bremiber@espol.edu.ec>
 */

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