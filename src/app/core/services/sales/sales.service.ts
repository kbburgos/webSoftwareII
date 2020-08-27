import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
import { UsuarioInterface } from "app/core/interface/usuario-interface";
import { SeguridadService } from "app/core/services/seguridad.service";

@Injectable({
  providedIn: "root",
})

/**
 * @classdesc Container class of SalesService.
 * @desc Creation Date: 08/17/2020
 * @class
 * @public
 * @version 2.0.0
 * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
 **/
export class SalesService {
  private readonly JWT_TOKEN = "JWT_TOKEN";
  private readonly REFRESH_TOKEN = "REFRESH_TOKEN";

  constructor(
    private http: HttpClient,
    private router: Router,
    private seguridad: SeguridadService
  ) {}


  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {JSON} JSON with the data obtained from the query.
   * @desc This method is responsible for searching the sales information from firebase. <br> Creation Date: 08/17/2020
   * @type {Promise<void>} Void type promise.
   * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
   */

  getcompras() {
    return this.http.get(environment.rutas.getCompras);
  }
}
