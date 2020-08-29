import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Promociones } from "../../interface/promociones";
import { environment } from "../../../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PromocionesService {
  

  constructor(private firebase: AngularFirestore) {}

  getPromociones() {
    return this.firebase
      .collection(environment.nombresColecciones.promociones)
      .snapshotChanges()
      .pipe(
        map((promociones) => {
          return promociones.map(e=>{
            return e.payload.doc.data() as Promociones
          })
        })
      );
  }
}
