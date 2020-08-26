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

@Injectable({
  providedIn: "root",
})

/**
 * @classdesc Container class of UserService.
 * @desc Creation Date: 08/07/2020
 * @class
 * @public
 * @version 2.0.0
 * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
 */
export class UsersService {
  private readonly JWT_TOKEN = "JWT_TOKEN";
  private readonly REFRESH_TOKEN = "REFRESH_TOKEN";
  public cedula: string;

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
   * @desc This method is responsible for searching all user in the system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
   */

  usuarios() {
    return this.http.get(environment.rutas.usersS);
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {JSON} JSON with the data obtained from the query.
   * @desc This method is responsible for searching a specific user based on his credencials. <br> Creation Date: 08/10/2020
   * @param {Request} string user authentication token
   * @param {Response} string user id identification
   * @type {Promise<void>} Void type promise.
   * @author Brenda Bermello <bremiber@espol.edu.ec>
   */

  userById(token: string, id: string) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    return this.http.get(environment.rutas.usersS + id, { headers });
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for searching a specific user based on his credencials and delete from the data base. <br> Creation Date: 08/10/2020
   * @param {Request} string user id identification
   * @type {Promise<void>} Void type promise.
   * @author Brenda Bermello <bremiber@espol.edu.ec>
   */
  deleteUser(cedula: string) {
    return this.http.delete(environment.rutas.deleteUser + cedula);
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for add an user in the database. <br> Creation Date: 08/17/2020
   * @param {Request} req data Request
   * @type {Promise<void>} Void type promise.
   * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
   */

  guardarUser(datos: UsuarioInterface) {
    const hash = this.seguridad.hashJSON(datos);
    datos.hash = hash;
    console.log(datos);
    const url = environment.rutas.urlGetUser;
    return this.http.post(url, datos);
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for set an user' information in the database. <br> Creation Date: 08/19/2020
   * @param {Request} req data Request
   * @type {Promise<void>} Void type promise.
   * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
   */
  setUserInfo(datos: UsuarioInterface) {
    const hash = this.seguridad.hashJSON(datos);
    datos.hash = hash;
    console.log("here I'm", datos);
    const url = environment.rutas.updateUser + datos.cedula;
    return this.http.put(url, datos);
  }
}
