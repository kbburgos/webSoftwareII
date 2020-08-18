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
export class ProductoService {
  
  constructor(private firebase: AngularFirestore) {}

  getProductos() {
    return this.firebase
      .collection(environment.nombresColecciones.producto)
      .snapshotChanges()
      .pipe(
        map((producto) => {
         // console.log("VA UNA ", producto);
          return producto.map((e) => {
          //  console.log("VA DOS ", e);
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
    //console.log("A VER QUE ONDITA");
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

  updateProduct(producto: Products){
    console.log(producto)
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