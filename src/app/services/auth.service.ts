import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'environments/environment';
import { tap,  mapTo, catchError } from 'rxjs/operators';
import { Tokens } from 'app/models/tokens';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser : string;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, contrasenia: string){
    let  usuario =  {"email": email, "clave": contrasenia};
    console.log("entre al login");
    this.http.post(environment.rutas.login,usuario).subscribe(data =>{
      if(data != null){
        this.doLoginUser(data);
      }else{
        alert("No se pudo iniciar sesión");
      }
    })

  }

  usuario(token: string){
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ token};
    this.http.get(environment.rutas.usersS,{headers}).subscribe( usuario =>{
      environment.variables.usuariosSistema.push(usuario)
    });
  }

  novedades(token: string){
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ token};
    this.http.get(environment.rutas.novedades,{headers}).subscribe( data =>{
        console.log(data);
    });
  }

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
  }

  logout() {
    return this.http.post<any>(environment.rutas.logOut, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  private  doLoginUser(data){
    this.loggedUser = data.data["email"];
    let tokens : Tokens =  {token : data.token, refreshToken: data.refreshToken};
    this.storeTokens(tokens);
    this.novedades(data.token);
    this.router.navigateByUrl("/dashboard");
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }
}
