import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { Orders } from 'app/core/interface/orders';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({

  providedIn: 'root'
})
export class PedidoService {

  PedidosDoc: AngularFirestoreDocument<Orders>;


  constructor(private firebase: AngularFirestore, private http: HttpClient) { }

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

  getPedidosByPedidoId(idPedido: string) {
    return this.firebase
      .collection(environment.nombresColecciones.pedido, ref => ref.where('idPedido', '==', idPedido))
      .snapshotChanges()
      .pipe(
        map((producto) => {
          return producto.map((e) => {
            return e.payload.doc.data() as Orders;
          });
        })
      );
  }

  getPedidosByEstadoByTipo(estado: number, isDomicilio: boolean) {
    return this.firebase
      .collection(environment.nombresColecciones.pedido, ref => 
      ref.where('estadoDelPedido', '==', estado).
      where('tipoEntrega', '==', isDomicilio))
      .snapshotChanges()
      .pipe(
        map((producto) => {
          return producto.map((e) => {
            return e.payload.doc.data() as Orders;
          });
        })
      );
  }

  getPedidosByEstado(estado: number) {
    return this.firebase
      .collection(environment.nombresColecciones.pedido, ref => 
      ref.where('estadoDelPedido', '==', estado))
      .snapshotChanges()
      .pipe(
        map((producto) => {
          return producto.map((e) => {
            return e.payload.doc.data() as Orders;
          });
        })
      );
  }

  getPedidosByClienteId(cedula: string) {
    return this.firebase
      .collection(environment.nombresColecciones.pedido, ref => ref.where('idCliente', '==', cedula))
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

  updatePedidos(pedido: Orders) {
    this.PedidosDoc =  this.firebase.doc(`pedido/${pedido.idPedido}`);
    this.PedidosDoc.update(pedido);
  }

  getPedidosDispatchedFromApi(token: string) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token};
    this.http.get(environment.rutas.pedidos, {headers}).subscribe( pedidos => {
      console.log('dentro del get del api: ', pedidos);
      return pedidos;
    });
  }
}
