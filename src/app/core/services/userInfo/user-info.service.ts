import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  public cedula: string = "";
  public usuario: string = "";
  public apellido: string = "";
  public telefono: string = "";
  public email: string = "";
  public direccion: string = "";


  constructor() { }
}
