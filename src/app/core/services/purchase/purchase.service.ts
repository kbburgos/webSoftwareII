import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { SeguridadService } from '../seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient, private seguridad: SeguridadService) { }

  createPurchase(token: string, body) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    const hash = this.seguridad.hashJSON(body);
    body['hash'] = hash;
    return this.http.post(environment.rutas.createCompras, body, {headers});
  }

  getPurchase(token: string) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    
    return this.http.get(environment.rutas.getCompras, { headers });
  }
}
