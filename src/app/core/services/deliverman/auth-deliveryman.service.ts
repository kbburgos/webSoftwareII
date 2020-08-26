import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { Token } from '../../interface/token';
import { Usuarios } from 'app/core/interface/Usuarios';
import { tap } from 'rxjs/operators';
import { SeguridadService } from '../seguridad.service';
@Injectable({
  providedIn: 'root'
})
 /**
 * @classdesc Container class of AuthDeliverymanService.
 * @desc Creation Date: 08/07/2020
 * @class
 * @public
 * @version 2.0.0
 * @author Danny Rios <dprios@espol.edu.ec>
 **/
export class AuthDeliverymanService {
  private readonly REPARTIDOR = 'REPARTIDOR';
  token: Token;
  isAuth = false;
  dataUser: Usuarios;
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private seguridad: SeguridadService
    ){} 

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {JSON} JSON with the data obtained from the query.
   * @desc This method is responsible for searching an user with credentials in the database. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  public loginToApi(email: string, clave: string) {
    const body = {
      email,
      clave,
    };
    return this.httpClient.post(environment.rutas.urlLogin, body);
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for deleting delivryman id encrypted in storage system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  removeTokens() {
    localStorage.removeItem(this.REPARTIDOR);
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for saving delivryman id encrypted in storage system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  saveIdStorage( id: string) {
    const encryptR = this.seguridad.encriptar(id.trim());
    localStorage.setItem(this.REPARTIDOR, encryptR);
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {string} deliveryman id decrypt.
   * @desc This method is responsible for searching a delivryman id encrypted in storage system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  getdeliverIdStorage() {
    const encryptext = localStorage.getItem(this.REPARTIDOR);
    const decrypt = this.seguridad.desencriptar(encryptext);
    return decrypt;
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {string} deliveryman id decrypt.
   * @desc This method is responsible for confirming a deliveryman is logged. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  getLogginFirebase() {
    return !!localStorage.getItem(this.REPARTIDOR);
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {string} deliveryman id decrypt.
   * @desc This method is responsible for deleting refreshToken in api. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  rejectTokenFromApi(body) {
    return this.httpClient.post(environment.rutas.rejectToken, body);
  }
}
