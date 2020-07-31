import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";

import { Deliveryman } from 'app/resource/interface/deliveryman';
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class DeliverymanService {


  constructor(private firebase: AngularFirestore) { }

  getRepartidores() {
    return this.firebase
      .collection(environment.nombresColecciones.repartidor)
      .snapshotChanges()
      .pipe(
        map((repartidor) => {
          return repartidor.map((e) => {
            console.log(repartidor);
            return e.payload.doc.data() as Deliveryman;
          });
        })
      );
  }
}
