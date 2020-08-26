import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { Orders } from 'app/core/interface/orders';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SeguridadService } from '../seguridad.service';

@Injectable({

  providedIn: 'root'
})
/**
 * @classdesc Container class of PedidoService.
 * @desc Creation Date: 08/07/2020
 * @class
 * @public
 * @version 2.0.0
 * @author Danny Rios <dprios@espol.edu.ec>
 */
export class PedidoService {

  PedidosDoc: AngularFirestoreDocument<Orders>;


  constructor(private firebase: AngularFirestore, private http: HttpClient, private seguridad: SeguridadService) { }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {JSON} JSON with the data obtained from the query.
   * @desc This method is responsible for searching all orders in firebase. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
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

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {JSON} JSON with the data obtained from the query.
   * @desc This method is responsible for searching all orders by id. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */

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

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {JSON} JSON with the data obtained from the query.
   * @desc This method is responsible for searching all orders by type and state in firebase. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  getPedidosByEstadoByTipo(estado: number, isDomicilio: boolean) {
    return this.firebase
      .collection(environment.nombresColecciones.pedido, ref =>
      ref.where('estadoDelPedido', '==', estado).
      where('isDomicilio', '==', isDomicilio))
      .snapshotChanges()
      .pipe(
        map((producto) => {
          return producto.map((e) => {
            return e.payload.doc.data() as Orders;
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
   * @desc This method is responsible for searching all orders by state in firebase. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
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

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {JSON} JSON with the data obtained from the query.
   * @desc This method is responsible for searching all orders by client id  in firebase.. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
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

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for delete an order by id in firebase. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  deletePedido(idPedido: string) {
    this.PedidosDoc = this.firebase.doc(`pedido/${idPedido}`);
    this.PedidosDoc.delete();
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for update an order by id in firebase. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  updatePedidos(pedido: Orders) {
    this.PedidosDoc =  this.firebase.doc(`pedido/${pedido.idPedido}`);
    this.PedidosDoc.update(pedido);
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {JSON} JSON with the data obtained from the query.
   * @desc This method is responsible for searching all orders in the database. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  getPedidosDispatchedFromApi() {
    return this.http.get(environment.rutas.getPedidos);
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for create an order in the database. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  setPedidosToDispatched( body) {
    const hash = this.seguridad.hashJSON(body);
    body['hash'] = hash;
    console.log(body);
    return this.http.post(environment.rutas.createPedidos, body);
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for create an order in the database when te user is Deliveryman <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  setPedidosToDispatchedByRepartidor(token: string, body) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    const hash = this.seguridad.hashJSON(body);
    body['hash'] = hash;
    console.log(body);
    return this.http.post(environment.rutas.createPedidos, body, { headers });
  }



}
