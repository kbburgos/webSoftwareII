import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AngularFirestore,
} from "@angular/fire/firestore";
import { Tokens } from 'app/models/tokens';
import { Router } from '@angular/router';
import { tap,  mapTo, catchError } from 'rxjs/operators';
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { Usuarios } from 'app/resource/interface/Usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private router: Router) { }

  usuarios(token: string){
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ token};
    return this.http.get(environment.rutas.usersS,{headers});
  }

}
