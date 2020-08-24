import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NovelyDeliverman } from "app/core/interface/noveltyDeliverman";
import { Tokens } from "app/core/models/tokens";
import { AuthService } from "../auth/auth.service"
import { Router } from "@angular/router";
import { tap, mapTo, catchError } from "rxjs/operators";
import { environment } from "../../../../environments/environment";
import { map } from "rxjs/operators";
import { SeguridadService } from "app/core/services/seguridad.service";

import { Observable, of } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class NoveltyService {

  constructor(
    private http: HttpClient, 
    private router: Router,
    private seguridad: SeguridadService) { }

  getnovedadesReporta(token: string, cedula: string) {
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    return this.http.get(environment.rutas.reportaNovelty+cedula, { headers });
  }

  addNovelty(token: string, novedad){
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    const hash=this.seguridad.hashJSON(novedad);
    novedad['hash']=hash;
    console.log("Estoy en el servicio de agregar novedad");

    return this.http.post(environment.rutas.novedades, novedad, {headers});
    
  }
}
