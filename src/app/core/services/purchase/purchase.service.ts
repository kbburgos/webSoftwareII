import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { SeguridadService } from '../seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient, private seguridad: SeguridadService) { }

  createPurchase( body) {
    const hash = this.seguridad.hashJSON(body);
    body['hash'] = hash;
    return this.http.post(environment.rutas.createCompras, body);
  }

  getPurchase() {
    return this.http.get(environment.rutas.getCompras);
  }
  getPurchaseRepartidor(token: string) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return this.http.get(environment.rutas.getCompras, { headers });
  }
  createPurchaseRepartidor(token: string, body) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    const hash = this.seguridad.hashJSON(body);
    body['hash'] = hash;
    return this.http.post(environment.rutas.createCompras, body, { headers });
  }
}
