import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { environment } from "../../../../environments/environment";
import { map } from "rxjs/operators";
import { NovelyDeliverman } from 'app/core/interface/noveltyDeliverman';

@Injectable({
  providedIn: 'root'
})
export class DelivermanReporterService {

  constructor(private firebase: AngularFirestore) { }

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

  pushPedidoFinal(novedad: NovelyDeliverman) {
    console.log("recibe esta novedad: ", novedad);
    let id = this.firebase.createId();
    novedad.idNovedad = id;
    return this.firebase
      .collection(environment.nombresColecciones.novedadesRepartidor)
      .doc(id)
      .set(novedad);
  }

  deleteNovedadRepartidor(idNovedad){
    this.firebase
      .collection("novedadesRepartidor")
      .doc(idNovedad)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  }

}
