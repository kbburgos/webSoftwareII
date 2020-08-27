import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


/**
 * @classdesc Container class of UserInfoService.
 * @desc Creation Date: 08/17/2020
 * @class
 * @public
 * @version 2.0.0
 * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
 **/
export class UserInfoService {
  public cedula: string = "";
  public usuario: string = "";
  public apellido: string = "";
  public telefono: string = "";
  public email: string = "";
  public direccion: string = "";
  public rol: number;


  constructor() { }
}
