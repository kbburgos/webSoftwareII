import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AngularFirestore } from "@angular/fire/firestore";
import { Tokens } from "app/core/models/tokens";
import { Router } from "@angular/router";
import { tap, mapTo, catchError } from "rxjs/operators";
import { environment } from "environments/environment";
import { map } from "rxjs/operators";
import { UsuarioInterface } from "app/core/interface/usuario-interface";
import { SeguridadService } from "app/core/services/seguridad.service";

import { Observable, of } from "rxjs";

import { CustomerNews } from "app/core/interface/customerNews";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private readonly JWT_TOKEN = "JWT_TOKEN";
  private readonly REFRESH_TOKEN = "REFRESH_TOKEN";
  public cedula: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private seguridad: SeguridadService
  ) {}

  usuarios() {
    console.log("mami");
    return this.http.get(environment.rutas.usersS);
  }

  userById(token: string, id: string) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    return this.http.get(environment.rutas.usersS + id, { headers });
  }

  deleteUser(cedula: string) {
    return this.http.delete(environment.rutas.deleteUser + cedula);
  }

  guardarUser(datos: UsuarioInterface) {
    const hash = this.seguridad.hashJSON(datos);
    datos.hash = hash;
    console.log(datos);
    const url = environment.rutas.urlGetUser;
    return this.http.post(url, datos);
  }

  setUserInfo(datos: UsuarioInterface) {
    const hash = this.seguridad.hashJSON(datos);
    datos.hash = hash;
    console.log("here I'm", datos);
    const url = environment.rutas.updateUser + datos.cedula;
    return this.http.put(url, datos);
  }
}
