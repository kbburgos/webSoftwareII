import { Injectable } from '@angular/core';
import {
  AngularFirestore,
} from "@angular/fire/firestore";

import { DeliveryManNews } from 'app/resource/interface/deliverymanNews';
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DeliverymanNewsService {

  constructor(private firebase: AngularFirestore) { }

  getNovedadesRepartidores(){
    return this.firebase
      .collection(environment.nombresColecciones.novedadesRepartidor)
      .snapshotChanges()
      .pipe(
        map((novedadesRepartidor) => {
          return novedadesRepartidor.map((e) => {
            return e.payload.doc.data() as DeliveryManNews;
          });
        })
      );
  }
}
