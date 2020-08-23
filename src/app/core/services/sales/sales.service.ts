import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
import { UsuarioInterface } from "app/core/interface/usuario-interface";
import { SeguridadService } from "app/core/services/seguridad.service";

@Injectable({
  providedIn: "root",
})
export class SalesService {
  private readonly JWT_TOKEN = "JWT_TOKEN";
  private readonly REFRESH_TOKEN = "REFRESH_TOKEN";

  constructor(
    private http: HttpClient,
    private router: Router,
    private seguridad: SeguridadService
  ) {}

  getcompras(token: any) {
    console.log("llegas")
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    return this.http.get(environment.rutas.getCompras, { headers });
  }
}
