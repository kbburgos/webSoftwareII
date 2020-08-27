import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Token } from "../../interface/token";
import { Usuarios } from "../../interface/Usuarios";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})


/**
 * @classdesc Container class of the authentication services.
 * @desc Creation Date: 10/07/2020
 * @class
 * @public
 * @version 1.0.0
 * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
 */

export class AuthService {
  private readonly JWT_TOKEN = "JWT_TOKEN";
  private readonly REFRESH_TOKEN = "REFRESH_TOKEN";
  envUsuario = environment;
  loggedUser: string;
  token: Token;
  isAuth: boolean = false;
  dataUser: Usuarios;
  idUserFirebase: string;
  data: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private AFauth: AngularFireAuth
  ) {}

  /**
   * @static
   * @method
   * @public
   * @version 1.0.0
   * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
   * @returns {JSON} JSON with the data obtained from the query.
   * @desc This method is responsible for searching an user with credentials in the database. <br> Creation Date: 08/07/2020
   * @param {Any} string the user email.
   * @param {Any} string the user password.
   * @type {Promise<void>} Void type promise.
   */

  public loginToApi(email: string, clave: string) {
    const body = {
      email,
      clave,
    };
    console.log(body);
    return this.httpClient.post(environment.rutas.urlLogin, body);
  }


  /**
   * @static
   * @method
   * @public
   * @version 1.0.0
   * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
   * @desc This method is responsible for link the doLogoutUser. <br> Creation Date: 08/10/2020
   */

  logout() {
    this.doLogoutUser();
    this.router.navigateByUrl("login");
  }


  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {string} user token.
   * @desc This method looking for the user token, if there is one on the localStorage. <br> Creation Date: 08/10/2020
   * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
   */
  isLoggedIn() {
    return !!this.getJwtToken();
  }


  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {string} new token.
   * @type {Promise<void>} Void type promise.
   * @desc this method is responsable for refresh the user token when that is expired. <br> Creation Date: 08/10/2020
   * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
   */
  refreshToken() {
    console.log({
      id: this.dataUser.email,
      refreshToken: this.token.refreshToken,
    });
    return this.httpClient
      .post<any>(environment.rutas.urlToken, {
        id: this.dataUser.cedula,
        refreshToken: this.token.refreshToken,
      })
      .pipe(
        tap((token: Token) => {
          this.storeJwtToken(token.token);
        })
      );
  }


  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {string} user token.
   * @desc this method returns a new token for the user session. <br> Creation Date: 08/10/2020
   * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
   */  
  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

    /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc this method returns a new token for the user session. <br> Creation Date: 08/10/2020
   * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
   */  
  doLoginUser(tokens: Token, cedula: string) {;
    this.storeTokens(tokens, cedula);
  }


  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc this method is called when the user close session from the web app. <br> Creation Date: 08/10/2020
   * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
   */
  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }


  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {String} JSON user access token.
   * @desc this method return the refresh token from the localStorage. <br> Creation Date: 08/10/2020
   * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
   */
  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }


  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {String} JSON user access token.
   * @desc this method storage the user authorization token in the localStorage. <br> Creation Date: 08/10/2020
   * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
   */
  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }


  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {String} JSON user information.
   * @desc this method storage the user authorization token in the localStorage. <br> Creation Date: 08/10/2020
   * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
   */

  private storeTokens(tokens: Token, cedula:string) {
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
    localStorage.setItem("cedula", cedula)
  }


  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc this method remove from the localStorage the user authorization token. <br> Creation Date: 08/10/2020
   * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
   */

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}