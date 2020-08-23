import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { Deliveryman } from 'app/core/interface/deliveryman';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { SeguridadService } from '../seguridad.service';

@Injectable({
  providedIn: 'root',
})
export class DeliverymanService {
  DeliverDoc: AngularFirestoreDocument<Deliveryman>;

  constructor(
    private firebase: AngularFirestore,
    private seguridad: SeguridadService
  ) {}

  getRepartidores() {
    return this.firebase
      .collection(environment.nombresColecciones.repartidor)
      .snapshotChanges()
      .pipe(
        map((repartidor) => {
          return repartidor.map((e) => {
            return e.payload.doc.data() as Deliveryman;
          });
        })
      );
  }
  updateDeliveryMan(deliveryman: Deliveryman) {
    this.DeliverDoc = this.firebase.doc(
      `repartidor/${deliveryman.idRepartidor}`
    );
    this.DeliverDoc.update(deliveryman);
  }

  getDeliveryManByCedula(cedula: string): any {
    return this.firebase
      .collection(environment.nombresColecciones.repartidor, (ref) =>
        ref.where('cedula', '==', cedula)
      )
      .snapshotChanges()
      .pipe(
        map((repartidor) => {
          return repartidor.map((e) => {
            return e.payload.doc.data() as Deliveryman;
          });
        })
      );
  }

  getRepartidorLogin(cedula: any, contrasena: any) {
    return this.firebase
      .collection(environment.nombresColecciones.repartidor, (ref) =>
        ref.where('cedula', '==', cedula).where('contrasenia', '==', contrasena)
      )
      .snapshotChanges()
      .pipe(
        map((repartidor) => {
          return repartidor.map((e) => {
            return e.payload.doc.data() as Deliveryman;
          });
        })
      );
  }


  getClientIdStorage() {
    const encryptext = localStorage.getItem('cliente');
    const decrypt = CryptoJS.AES.decrypt(
      encryptext.trim(),
      environment.keyCrypto.trim()
    ).toString(CryptoJS.enc.Utf8);
    return decrypt;
  }

}
