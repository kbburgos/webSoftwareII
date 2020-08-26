import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/services/auth/auth.service";
import { DelivermanReporterService } from "../../core/services/deliverman/deliverman-reporter.service";
import { DeliverymanService } from "../../core/services/deliverman/deliveryman.service";
import { NovelyDeliverman } from "../../core/interface/noveltyDeliverman";
import { NovelyDelivermanView } from "../../core/interface/noveltyDelivermanView";
import { NoveltyService } from "../../core/services/novelty/novelty.service";
import { ConfirmationService } from "primeng/api";
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";

@Component({
  selector: "app-delivery-notification",
  templateUrl: "./delivery-notification.component.html",
  styleUrls: ["./delivery-notification.component.css"],
})
export class DeliveryNotificationComponent implements OnInit {
  private form: FormGroup;
  token: any = this.authService.getJwtToken();
  display: boolean = false;
  bandera: boolean = false;
  novedadAdmin: any[];
  deliverymannew: NovelyDeliverman[];
  deliverymannewView: NovelyDelivermanView[];
  listanovedades: Array<any> = [];
  dato: string;
  envU = environment;
  private subsubscribe;
  private adminNoveltySubscribe;
  private 
  cols: any[];

  constructor(
    private deliverymanreportService: DelivermanReporterService,
    private deliverymanService: DeliverymanService,
    private confirmationService: ConfirmationService,
    private novelty: NoveltyService,
    private authService: AuthService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit() {
    this.spinner.show();
    let subsubscribe = this.deliverymanreportService.getNovedadesRepartidores()
    .subscribe((item: any) => {
      this.deliverymannewView = item;
      this.spinner.hide();

      for(let i=0; i<environment.variables.nombreRepartidores.length; i++){
        for(let j=0; j<this.deliverymannewView.length; j++){
          if(environment.variables.nombreRepartidores[i]['cedula'] === this.deliverymannewView[j].idRepartidor){
            this.deliverymannewView[j].repartidor = environment.variables.nombreRepartidores[i]['nombre']+' '+
            environment.variables.nombreRepartidores[i]['apellido'];
            this.deliverymannewView[j].fecha = (this.deliverymannewView[j].fecha.toDate());
          }
        }
      }

      for(let i=0; i<environment.variables.nombreClientes.length; i++){
        for(let j=0; j<this.deliverymannewView.length; j++){
          if(environment.variables.nombreClientes[i]['cedula'] === this.deliverymannewView[j].idCliente){
            this.deliverymannewView[j].cliente = environment.variables.nombreClientes[i]['nombre']+' '+
            environment.variables.nombreClientes[i]['apellido'];
          }
        }
      }
    });

    let adminNoveltySubscribe = this.novelty.getnovedadesReporta(this.token, this.authService.dataUser.cedula)
    .subscribe((data:any)=>{
      this.novedadAdmin = data;
      for(let i=0; i<environment.variables.nombreClientes.length; i++){
        for (let j=0; j<this.novedadAdmin.length; j++){
          if(environment.variables.nombreClientes[i]['cedula'] === this.novedadAdmin[i].idUsuarioreportado){
            this.novedadAdmin[j].usuarioReportado=environment.variables.nombreClientes[i]['nombre']+' '+
            environment.variables.nombreClientes[i]['apellido'];
            this.novedadAdmin[j].esCliente=true;
          }
        }
      }
    })
    
    this.buildForm();
  }

  

  showAddDialog() {
    this.display = true;
  }

  eliminarRepartidorNovedad(novelydeliverman){
    this.deliverymanreportService.deleteNovedadRepartidor(novelydeliverman.idNovedad);
  }

  addNovedad(){
    const novedadNueva = {
      idusuarioReporta: this.authService.dataUser['cedula'],
      idusuarioReportado: this.form.get('cedula').value,
      descripcion: this.form.get('novedad').value,
    };

    this.novelty.addNovelty(this.token, novedadNueva).subscribe(item=>{
      console.log(item);
    },
    error=>{
      console.log(error);
    });
    this.display=false;
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      cedula: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
      novedad: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  clearState() {
    this.display = false;
    this.form.reset();
  }

  ngOnDestroy() {
    if (this.adminNoveltySubscribe) {
      this.adminNoveltySubscribe.unsubscribe();
    }
    if (this.subsubscribe) {
      this.subsubscribe.unsubscribe();
    }
  }

}
