import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";

import { Orders } from 'app/resource/interface/orders';
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  PedidosDoc: AngularFirestoreDocument<Orders>;


  constructor(private firebase: AngularFirestore) { }

  getPedidos() {
    return this.firebase
      .collection(environment.nombresColecciones.pedido)
      .snapshotChanges()
      .pipe(
        map((producto) => {
          return producto.map((e) => {
            return e.payload.doc.data() as Orders;
          });
        })
      );
  }
  deletePedido(idPedido: string) {
    this.PedidosDoc = this.firebase.doc(`pedido/${idPedido}`);
    this.PedidosDoc.delete();
  }

  updatePedidos(pedido: Orders){
    this.PedidosDoc =  this.firebase.doc(`pedido/${pedido.idPedido}`);
    this.PedidosDoc.update(pedido);
  }
}
