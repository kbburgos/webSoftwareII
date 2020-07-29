import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Products } from "../resource/interface/products";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProductoService {
  ProductDoc: AngularFirestoreDocument<Products>;


  constructor(private firebase: AngularFirestore) {}

  getProductos() {
    return this.firebase
      .collection(environment.nombresColecciones.producto)
      .snapshotChanges()
      .pipe(
        map((producto) => {
          console.log("VA UNA ", producto);
          return producto.map((e) => {
            console.log("VA DOS ", e);
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

  deleteProduct(producto: Products) {
    this.ProductDoc = this.firebase.doc(`products/${producto.idProducto}`);
    this.ProductDoc.delete();
  }


  updateProduct(producto: Products){
    this.ProductDoc = this.firebase.doc(`products/${producto.idProducto}`);
    this.ProductDoc.update(producto);
  }
}
