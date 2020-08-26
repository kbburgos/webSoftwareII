/**
 * @interface Products
 * @public
 * @version 1.0.0
 * @desc Products interface.
 * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
 */

export interface  Products {
    descripcion: string;
    foto: string;
    idCategoria: string;
    idProducto?: string;
    nombre: string;
    isActivo: boolean;
    precio: number;
    stock: number;
    slide: string[]
}
