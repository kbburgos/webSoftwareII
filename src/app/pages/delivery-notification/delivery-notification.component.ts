import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/services/auth/auth.service";
import { DelivermanReporterService } from "../../core/services/deliverman/deliverman-reporter.service";
import { DeliverymanService } from "../../core/services/deliverman/deliveryman.service";
import { NovelyDeliverman } from "../../core/interface/noveltyDeliverman";
import { NovelyDelivermanView } from "../../core/interface/noveltyDelivermanView";
import { NoveltyService } from "../../core/services/novelty/novelty.service";
import { ConfirmationService } from "primeng/api";
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from "primeng/api";
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
  form: FormGroup;
  token: any = this.authService.getJwtToken();
  display: boolean = false;
  bandera: boolean = false;
  novedadAdmin: any[];
  deliverymannew: NovelyDeliverman[];
  deliverymannewView: NovelyDelivermanView[];
  listanovedades: Array<any> = [];
  dato: string;
  private subsubscribe;
  private adminNoveltySubscribe;
  cols: any[];

  constructor(
    private deliverymanreportService: DelivermanReporterService,
    private deliverymanService: DeliverymanService,
    private confirmationService: ConfirmationService,
    private novelty: NoveltyService,
    private authService: AuthService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit() {
    this.buildForm();
    this.cargar();
  }

  listaFiltroRepartidores(listaR: any){
    for(let i=0; i<environment.variables.nombreRepartidores.length; i++){
      for(let j=0; j<listaR.length; j++){
        if(environment.variables.nombreRepartidores[i]['cedula'] === listaR[j].idRepartidor){
          listaR[j].repartidor = environment.variables.nombreRepartidores[i]['nombre']+' '+
          environment.variables.nombreRepartidores[i]['apellido'];
          listaR[j].fecha = (listaR[j].fecha.toDate());
        }
      }
    }
    return listaR;
  }

  listaFiltroClientes(listaC: any){
    for(let i=0; i<environment.variables.nombreClientes.length; i++){
      for(let j=0; j<listaC.length; j++){
        if(environment.variables.nombreClientes[i]['cedula'] === listaC[j].idCliente){
          listaC[j].cliente = environment.variables.nombreClientes[i]['nombre']+' '+
          environment.variables.nombreClientes[i]['apellido'];
        }
      }
    }
    return listaC;
  }

  listaAdmin(listaAdmin: any){
    for(let i=0; i<environment.variables.nombreClientes.length; i++){
      for (let j=0; j<listaAdmin.length; j++){
        if(environment.variables.nombreClientes[i]['cedula'] === listaAdmin[i].idUsuarioreportado){
          listaAdmin[j].usuarioReportado=environment.variables.nombreClientes[i]['nombre']+' '+
          environment.variables.nombreClientes[i]['apellido'];
          listaAdmin[j].esCliente=true;
        }
      }
    }
    return listaAdmin;
  }

  cargar(){
    this.spinner.show();
    let subsubscribe = this.deliverymanreportService.getNovedadesRepartidores()
    .subscribe((item: any) => {
      console.log(item);
      this.deliverymannewView = this.listaFiltroClientes(this.listaFiltroRepartidores(item));
      console.log(this.deliverymannewView);

    });

    let adminNoveltySubs = this.novelty.getnovedadesReporta(this.token, this.authService.dataUser.cedula)
    .subscribe((data:any)=>{
      console.log(data);
      this.spinner.hide();
/*
      this.novedadAdmin = this.listaAdmin(data);
      if(Object.keys(this.novedadAdmin).length === 0){
        console.log("No existe novedad!");
      }
      },
      (err: any)=> {
        console.log(err);
        adminNoveltySubs.unsubscribe();
        this.showMessage("Error al cargar las novedades realizadas por el Administrador",
        "error",
        "Error!");*/
    });
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
      this.cargar();
      this.showMessage(
        "Novedad ingresada exitosamente",
        "success",
        "Agregada!"
      )
    },
    error=>{
      console.log(error);
      this.showMessage(
        "Error al agregar la novedad", "error", "Error!"
      )
    });
    this.display=false;
  }

  showMessage(mensaje: string, tipo: string, titulo: string) {
    this.messageService.add({
      severity: tipo,
      summary: titulo,
      detail: mensaje,
      life: 4000,
    });
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
