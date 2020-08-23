import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Token } from "../../interface/token";
import { Usuarios } from "../../interface/Usuarios";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
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

  public loginToApi(email: string, clave: string) {
    const body = {
      email,
      clave,
    };
    console.log(body);
    return this.httpClient.post(environment.rutas.urlLogin, body);
  }

  logout() {
    this.doLogoutUser();
    this.router.navigateByUrl("login");
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    console.log({
      id: this.dataUser.cedula,
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

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  doLoginUser(tokens: Token) {
    // this.loggedUser = username;
    console.log("estas en el doLoginUser ", tokens);
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Token) {
    console.log("estas en el storage token ", tokens);
    console.log("Este es el this.JWT_TOKEN ", this.JWT_TOKEN);
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  /*  
  refreshToken() {
    return this.http.post<any>(environment.rutas.refresh,
      {
        'email': this.loggedUser,
        'refreshToken': this.getRefreshToken()
      })
    .pipe(
      tap(data => {
      this.storeJwtToken(data.token);
    }));
  }*/
}