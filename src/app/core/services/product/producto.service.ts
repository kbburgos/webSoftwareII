import { Injectable } from "@angular/core";
import {
  AngularFirestore,
} from "@angular/fire/firestore";
import { Products } from "../../interface/products";
import { environment } from "../../../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})

/**
 * @classdesc Container class of ProductoService.
 * @desc Creation Date: 08/07/2020
 * @class
 * @public
 * @version 2.0.0
 * @author Brenda Bermello <bremiber@espol.edu.ec>
 */
export class ProductoService {
  
  constructor(private firebase: AngularFirestore) {}

      /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {JSON} JSON with the data obtained from firebase.
   * @desc This method is responsible for searching all products in firebase. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Brenda Bermello <bremiber@espol.edu.ec>
   */
  getProductos() {
    return this.firebase
      .collection(environment.nombresColecciones.producto)
      .snapshotChanges()
      .pipe(
        map((producto) => {
          return producto.map((e) => {
            return e.payload.doc.data() as Products;
          });
        })
      );
  }

  pushProductos(producto: Products) {
    let id = this.firebase.createId();
    producto.idProducto = id;
    return this.firebase
      .collection(environment.nombresColecciones.producto)
      .doc(id)
      .set(producto);
  }

  deleteProduct(idProducto) {
    this.firebase
      .collection("producto")
      .doc(idProducto)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  }

        /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {JSON} JSON with the data obtained from firebase.
   * @desc This method is responsible for editing products in firebase. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Brenda Bermello <bremiber@espol.edu.ec>
   */
  updateProduct(producto: Products){
    console.log("Producto a editar: ",producto)
    this.firebase
    .collection("producto")
    .doc(producto.idProducto)
    .update(producto)
    .then(function(){
      console.log("Producto editado con exito.");
    })
    .catch(function(){
      console.error("Error al editar el producto");
    });
  }
  
}
