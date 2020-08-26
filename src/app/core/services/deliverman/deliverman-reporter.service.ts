import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { NovelyDeliverman } from 'app/core/interface/noveltyDeliverman';

@Injectable({
  providedIn: 'root'
})
/**
 * @classdesc Container class of DelivermanReporterService.
 * @desc Creation Date: 08/07/2020
 * @class
 * @public
 * @version 2.0.0
 * @author Danny Rios <dprios@espol.edu.ec>
 */
export class DelivermanReporterService {

  constructor(private firebase: AngularFirestore) { }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {JSON} JSON with the data obtained from the query.
   * @desc This method is responsible for searching all deliveryman noveltys in firebase. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  getNovedadesRepartidores() {
    return this.firebase
      .collection(environment.nombresColecciones.novedadesRepartidor)
      .snapshotChanges()
      .pipe(
        map((novedad) => {
          return novedad.map((e) => {
            return e.payload.doc.data() as NovelyDeliverman;
          });
        })
      );
  }

   /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for creating a deliveryman novelty in firebase. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  pushPedidoFinal(novedad: NovelyDeliverman) {
    console.log('recibe esta novedad: ', novedad);
    const id = this.firebase.createId();
    novedad.idNovedad = id;
    return this.firebase
      .collection(environment.nombresColecciones.novedadesRepartidor)
      .doc(id)
      .set(novedad);
  }

   /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {JSON} JSON with the data obtained from the query.
   * @desc This method is responsible for removing a deliveryman novelty in firebase. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  deleteNovedadRepartidor(idNovedad) {
    this.firebase
      .collection('novedadesRepartidor')
      .doc(idNovedad)
      .delete()
      .then(function () {
        console.log('Document successfully deleted!');
      })
      .catch(function (error) {
        console.error('Error removing document: ', error);
      });
  }

}
