import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CustomerNews } from "../../core/interface/customerNews";
import { CustomerNewsView } from "../../core/interface/customerNewsView";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { HttpClientModule } from "@angular/common/http";

import { NoveltyService } from "../../core/services/novelty/novelty.service";
import { NovelyDelivermanView } from "../../core/interface/noveltyDelivermanView";
import { UserNotificationService } from "../../core/services/user/user-notification.service";
import { AuthService } from "../../core/services/auth/auth.service";
import { environment } from "environments/environment";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";

@Component({
  selector: "app-user-notification",
  templateUrl: "./user-notification.component.html",
  styleUrls: ["./user-notification.component.css"],
})
export class UserNotificationComponent implements OnInit {
  private form: FormGroup;
  token: any = this.authService.getJwtToken();
  display: boolean = false;
  cols: any[];
  dato: string;
  novedadAdmin: any[];
  customernewsView: CustomerNewsView[];

  constructor(
    private confirmationService: ConfirmationService,
    private http: HttpClient,
    private userNotification: UserNotificationService,
    private novelty: NoveltyService,
    private authService: AuthService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.userNotification
      .clienteNotification(this.token)
      .subscribe((data: any) => {
        this.customernewsView = this.listaFiltroClientes(
          this.listaFiltroRepartidores(data)
        );
        console.log(this.customernewsView);

        /*
      for (let i=0; environment.variables.nombreRepartidores.length; i++){
        for (let j=0; this.customernewsView.length; j++){
          if(environment.variables.nombreRepartidores[i]['cedula'] === this.customernewsView[j].idUsuarioreportado){
            this.customernewsView[j].usuarioReportado =environment.variables.nombreRepartidores[i]['nombre']+' '+
            environment.variables.nombreRepartidores[i]['apellido']
          }
        }
      }

      for (let i=0; environment.variables.nombreClientes.length; i++){
        for (let j=0; this.customernewsView.length; j++){
          if(environment.variables.nombreClientes[i]['cedula'] === this.customernewsView[j].idUsuarioreporta){
            this.customernewsView[j].usuarioReporta =environment.variables.nombreClientes[i]['nombre']+' '+
            environment.variables.nombreClientes[i]['apellido']
          }
          if(environment.variables.nombreClientes[i]['rol'] === 3){
            this.customernewsView[j].esCliente=true;
          }else{
            this.customernewsView[j].esCliente=false;
          }
        }
      }
      */
      });

    let adminNoveltySubscribe = this.novelty
      .getnovedadesReporta(this.token, this.authService.dataUser.cedula)
      .subscribe((data: any) => {
        this.novedadAdmin = this.listaAdmin(data);
        /*for (let i=0; environment.variables.nombreRepartidores.length; i++){
        for (let j=0; this.novedadAdmin.length; j++){
          if(environment.variables.nombreRepartidores[i]['cedula'] === this.novedadAdmin[j].idUsuarioreportado){
            this.novedadAdmin[j].usuarioReportado =environment.variables.nombreRepartidores[i]['nombre']+' '+
            environment.variables.nombreRepartidores[i]['apellido'];
            this.novedadAdmin[j].esCliente=false;
            console.log(this.novedadAdmin[j].esCliente);
          }
        }
      }*/
      });

    this.buildForm();
  }

  listaFiltroRepartidores(listaR: any) {
    for (let i = 0; environment.variables.nombreRepartidores.length; i++) {
      for (let j = 0; listaR.length; j++) {
        if (
          environment.variables.nombreRepartidores[i]["cedula"] ===
          listaR[j].idUsuarioreportado
        ) {
          listaR[j].usuarioReportado =
            environment.variables.nombreRepartidores[i]["nombre"] +
            " " +
            environment.variables.nombreRepartidores[i]["apellido"];
        }
      }
    }
    return listaR;
  }

  listaFiltroClientes(listaC: any) {
    for (let i = 0; environment.variables.nombreClientes.length; i++) {
      for (let j = 0; listaC.length; j++) {
        if (
          environment.variables.nombreClientes[i]["cedula"] ===
          listaC[j].idUsuarioreporta
        ) {
          listaC[j].usuarioReporta =
            environment.variables.nombreClientes[i]["nombre"] +
            " " +
            environment.variables.nombreClientes[i]["apellido"];
        }
        if (environment.variables.nombreClientes[i]["rol"] === 3) {
          listaC[j].esCliente = true;
        } else {
          listaC[j].esCliente = false;
        }
      }
    }
    return listaC;
  }

  listaAdmin(listaAdmin: any) {
    for (let i = 0; environment.variables.nombreRepartidores.length; i++) {
      for (let j = 0; listaAdmin.length; j++) {
        if (
          environment.variables.nombreRepartidores[i]["cedula"] ===
          listaAdmin[j].idUsuarioreportado
        ) {
          listaAdmin[j].usuarioReportado =
            environment.variables.nombreRepartidores[i]["nombre"] +
            " " +
            environment.variables.nombreRepartidores[i]["apellido"];
          listaAdmin[j].esCliente = false;
          console.log(listaAdmin[j].esCliente);
        }
      }
    }
    return listaAdmin;
  }

  showAddDialog() {
    this.display = true;
  }

  addNovedad() {
    const novedadNueva = {
      idusuarioReporta: this.authService.dataUser["cedula"],
      idusuarioReportado: this.form.get("cedula").value,
      descripcion: this.form.get("novedad").value,
    };
    this.novelty.addNovelty(this.token, novedadNueva).subscribe(
      (item) => {
        this.showMessage(
          "Novedad ingresada exitosamente",
          "success",
          "Agregada!"
        );
      },
      (error) => {
        console.log(error);
        this.showMessage("Error al agregar la novedad", "error", "Error!");
      }
    );

    this.display = false;
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

  public getError(controlName: string): string {
    let field: string;
    const control = this.form.get(controlName);
    if ((control.touched || control.dirty) && control.errors != null) {
      if (control.errors.required != null) {
        field = controlName;
        if (controlName === "cedula") {
          field = "C&eacute;dula";
        } else if (controlName === "novedad") {
          field = "Novedad";
        }
        return "El campo " + field + " es requerido.";
      }
    }
    return "";
  }

  clearState() {
    this.display = false;
    this.form.reset();
  }

  showMessage(mensaje: string, tipo: string, titulo: string) {
    this.messageService.add({
      severity: tipo,
      summary: titulo,
      detail: mensaje,
      life: 4000,
    });
  }
}
