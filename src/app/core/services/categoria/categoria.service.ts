import { Injectable } from '@angular/core';
import {
  AngularFirestore,
} from "@angular/fire/firestore";
import { Categoria } from "../../interface/categoria";
import { environment } from "../../../../environments/environment";
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private firebase: AngularFirestore) { }


  getCategorias() {
    return this.firebase
      .collection(environment.nombresColecciones.categorias)
      .snapshotChanges()
      .pipe(
        map((categoria) => {
      //    console.log("VA UNA ", categoria);
          return categoria.map((e) => {
         //   console.log("VA DOS ", e);
            return e.payload.doc.data() as Categoria;
          });
        })
      );
  }

  pushCategorias(categoria: Categoria) {
    let id = this.firebase.createId();
    categoria.idCategoria = id;
    return this.firebase
      .collection(environment.nombresColecciones.categorias)
      .doc(id)
      .set(categoria);
  }


  deleteCategorias(idCategoria) {
    //console.log("A VER QUE ONDITA");
    this.firebase
      .collection("categorias")
      .doc(idCategoria)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  }

  updateCategorias(categoria: Categoria){
    this.firebase
    .collection("categorias")
    .doc(categoria.idCategoria)
    .update(categoria)
    .then(function(){
      console.log("Categoria editado con exito.");
    })
    .catch(function(){
      console.error("Error al editar la categoria");
    });
  }


}
