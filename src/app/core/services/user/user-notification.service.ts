import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'environments/environment';
import { tap,  mapTo, catchError } from 'rxjs/operators';
import { Tokens } from 'app/core/models/tokens';
import { Router } from '@angular/router';
import { CustomerNews } from '../../interface/customerNews';

@Injectable({
  providedIn: 'root'
})

/**
 * @classdesc Container class of UserNotificationService.
 * @desc Creation Date: 08/07/2020
 * @class
 * @public
 * @version 2.0.0
 * @author Brenda Bermello Burgos <bremiber@espol.edu.ec>
 */

export class UserNotificationService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private novedades : string;

  constructor(private http: HttpClient, private router: Router) { }



  clienteNotification(token: string){
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ token};
    return this.http.get(environment.rutas.novedades,{headers});
  }

   pushUserNotification(){
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
