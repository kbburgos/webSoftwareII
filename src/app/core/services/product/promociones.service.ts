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
          console.log("VA UNA ",promociones);
          return promociones.map(e=>{
            console.log("VA DOS ",e)
            return e.payload.doc.data() as Promociones
          })
        })
      );
  }
}
