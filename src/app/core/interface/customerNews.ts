/**
 * @interface CustomerNews
 * @public
 * @version 1.0.0
 * @desc CustomerNews interface.
 * @author Brenda Bermello <bremiber@espol.edu.ec>
 */

export interface CustomerNews{
    idnovedad?: Number;
    idusuarioReporta: string;
    idusuarioReportado: string;
    descripcion: string;
    createdAt?: Date;
    updatedAt?: Date;
}