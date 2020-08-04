import { Injectable } from '@angular/core';
import {
  AngularFirestore,
} from "@angular/fire/firestore";
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

/*
  getUsers(
  login(email: string, contrasenia: string){
    let  usuario =  {"email": email, "clave": contrasenia};
    console.log("entre al login");
    this.http.post(environment.rutas.login,usuario).subscribe(data =>{
      if(data != null){
        this.doLoginUser(data);
      }else{
        alert("No se pudo iniciar sesión");
      }
    })

  }*/
}
