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

/**
 * @classdesc Container class of DeliverymanService.
 * @desc Creation Date: 08/07/2020
 * @class
 * @public
 * @version 2.0.0
 * @author Danny Rios <dprios@espol.edu.ec>
 */
export class DeliverymanService {
  DeliverDoc: AngularFirestoreDocument<Deliveryman>;

  constructor(
    private firebase: AngularFirestore,
    private seguridad: SeguridadService
  ) {}

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {JSON} JSON with the data obtained from the query.
   * @desc This method is responsible for searching all deliveryman in firebase. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
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

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for updating an deliveryman by id in firebase. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  updateDeliveryMan(deliveryman: Deliveryman) {
    this.DeliverDoc = this.firebase.doc(
      `repartidor/${deliveryman.idRepartidor}`
    );
    this.DeliverDoc.update(deliveryman);
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {JSON} JSON with the data obtained from the query.
   * @desc This method is responsible for searching a delivryman by id in firebase. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
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

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {JSON} JSON with the data obtained from the query.
   * @desc This method is responsible for searching all a deliveryman by id and password in firebase. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
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


}
