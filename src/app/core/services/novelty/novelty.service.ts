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

/**
 * @classdesc Container class of NoveltyService.
 * @desc Creation Date: 08/07/2020
 * @class
 * @public
 * @version 2.0.0
 * @author Brenda Bermello <bremiber@espol.edu.ec>
 */
export class NoveltyService {

  constructor(
    private http: HttpClient, 
    private router: Router,
    private seguridad: SeguridadService) { }

    /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {JSON} JSON with the data obtained from API.
   * @desc This method is responsible for searching all novelty of a deliveryman in API. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Brenda Bermello <bremiber@espol.edu.ec>
   */
  getnovedadesReporta(token: string, cedula: string) {
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    return this.http.get(environment.rutas.reportaNovelty+cedula, { headers });
  }

      /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for adding novelty in API. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Brenda Bermello <bremiber@espol.edu.ec>
   */
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
