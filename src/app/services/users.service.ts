import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AngularFirestore } from "@angular/fire/firestore";
import { Tokens } from "app/models/tokens";
import { Router } from "@angular/router";
import { tap, mapTo, catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { Usuarios } from "app/resource/interface/Usuarios";

import { Observable, of } from "rxjs";

import { CustomerNews } from "../resource/interface/customerNews";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private readonly JWT_TOKEN = "JWT_TOKEN";
  private readonly REFRESH_TOKEN = "REFRESH_TOKEN";

  constructor(private http: HttpClient, private router: Router) {}

  usuarios(token: string) {
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    return this.http.get(environment.rutas.usersS, { headers });
  }


}
