import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { Router } from '@angular/router';
import { Token } from "../../interface/token";
import { Usuarios } from 'app/core/interface/Usuarios';
import { tap } from 'rxjs/operators';
import { SeguridadService } from '../seguridad.service';
@Injectable({
  providedIn: 'root'
})
export class AuthDeliverymanService {
  private readonly JWT_TOKEN_REPARTIDOR = "JWT_TOKEN_REPARTIDOR";
  private readonly REFRESH_TOKEN_REPARTIDOR = "REFRESH_TOKEN_REPARTIDOR";
  private readonly REPARTIDOR = 'REPARTIDOR';
  private loggedUser: string;
  token: Token;
  isAuth = false;
  dataUser: Usuarios;
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private seguridad: SeguridadService
    )
   { }

  public loginToApi(email: string, clave: string) {
    const body = {
      email,
      clave,
    };
    return this.httpClient.post(environment.rutas.urlLogin, body);
  }

  refreshToken() {
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

  logout() {
    this.doLogoutUser();
    this.router.navigateByUrl("deliveryman");
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN_REPARTIDOR);
  }

  doLoginUser(tokens: Token) {
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN_REPARTIDOR);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN_REPARTIDOR, jwt);
  }

  private storeTokens(tokens: Token) {
    localStorage.setItem(this.JWT_TOKEN_REPARTIDOR, tokens.token);
    localStorage.setItem(this.REFRESH_TOKEN_REPARTIDOR, tokens.refreshToken);
  }

  removeTokens() {
    localStorage.removeItem(this.REPARTIDOR);
  }

  saveIdStorage( id: string) {
    const encryptR = this.seguridad.encriptar(id.trim());
    localStorage.setItem(this.REPARTIDOR, encryptR);
  }

  getdeliverIdStorage() {
    const encryptext = localStorage.getItem(this.REPARTIDOR);
    const decrypt = this.seguridad.desencriptar(encryptext);
    return decrypt;
  }

  getLogginFirebase() {
    return !!localStorage.getItem(this.REPARTIDOR);
  }

  rejectTokenFromApi(body) {
    return this.httpClient.post(environment.rutas.rejectToken, body);
  }
}
