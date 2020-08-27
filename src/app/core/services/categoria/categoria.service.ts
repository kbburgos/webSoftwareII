import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Categoria } from "../../interface/categoria";
import { environment } from "../../../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})

/**
 * @classdesc Container class of CategoriaService.
 * @desc Creation Date: 08/17/2020
 * @class
 * @public
 * @version 2.0.0
 * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
 **/
export class CategoriaService {
  constructor(private firebase: AngularFirestore) {}

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @returns {JSON} JSON with the data obtained from the query.
   * @desc This method is responsible for searching the category information from firebase. <br> Creation Date: 08/17/2020
   * @type {Promise<void>} Void type promise.
   * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
   */

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


  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for add categories to firebase category colecction. <br> Creation Date: 08/17/2020
   * @type {Promise<void>} Void type promise.
   * @param {Any} JSON JSON idCategoria.
   * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
   */
  pushCategorias(categoria: Categoria) {
    let id = this.firebase.createId();
    categoria.idCategoria = id;
    return this.firebase
      .collection(environment.nombresColecciones.categorias)
      .doc(id)
      .set(categoria);
  }


  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for delete categories from firebase category colecction. <br> Creation Date: 08/17/2020
   * @type {Promise<void>} Void type promise.
   * @param {Any} string String idCategoria.
   * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
   */
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


  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for update categories to firebase category colecction. <br> Creation Date: 08/17/2020
   * @type {Promise<void>} Void type promise.
   * @param {Any} string String idCategoria.
   * @author Karla Burgos Gayrey <kbburgos@espol.edu.ec>
   */
  updateCategorias(categoria: Categoria) {
    this.firebase
      .collection("categorias")
      .doc(categoria.idCategoria)
      .update(categoria)
      .then(function () {
        console.log("Categoria editado con exito.");
      })
      .catch(function () {
        console.error("Error al editar la categoria");
      });
  }
}
