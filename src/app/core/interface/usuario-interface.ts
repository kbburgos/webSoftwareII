/**
 * @interface UsuarioInterface
 * @public
 * @version 1.0.0
 * @desc UsuarioInterface interface.
 * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
 */

export interface UsuarioInterface {
    cedula?: string;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    direccion?: string;
    contrasenia: string;
    createdAt?: Date;
    rol: number;
    updatedAt?: Date;
    hash?: string;
}
