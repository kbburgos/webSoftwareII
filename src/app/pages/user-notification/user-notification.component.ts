import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CustomerNews } from "../../core/interface/customerNews";
import { CustomerNewsView } from "../../core/interface/customerNewsView";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { HttpClientModule } from "@angular/common/http";
import { NgxSpinnerService } from "ngx-spinner";
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
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    //this.spinner.show();
    this.buildForm();
    this.userNotification
      .clienteNotification(this.token)
      .subscribe((data: any) => {
        this.customernewsView = this.listaFiltroClientes(
          this.listaFiltroRepartidores(data)
        );
        //this.spinner.hide();
        console.log(this.customernewsView);
      });

    let adminNoveltySubscribe = this.novelty
      .getnovedadesReporta(this.token, this.authService.dataUser.cedula)
      .subscribe(
        (data: any) => {
          this.novedadAdmin = this.listaAdmin(data);
          if (Object.keys(this.novedadAdmin).length === 0) {
            console.log("No existe novedad!");
          }
        },
        (err: any) => {
          console.log(err);
          adminNoveltySubscribe.unsubscribe();
          this.showMessage(
            "Error al cargar las novedades realizadas por el Administrador",
            "error",
            "Error!"
          );
        }
      );
  }

  listaFiltroRepartidores(listaR: any) {
    for (let i = 0; i < environment.variables.nombreRepartidores.length; i++) {
      for (let j = 0; j < listaR.length; j++) {
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
    for (let i = 0; i < environment.variables.nombreClientes.length; i++) {
      for (let j = 0; j < listaC.length; j++) {
        if (
          environment.variables.nombreClientes[i]["cedula"] ===
          listaC[j].idUsuarioreporta
        ) {
          listaC[j].usuarioReporta =
            environment.variables.nombreClientes[i]["nombre"] +
            " " +
            environment.variables.nombreClientes[i]["apellido"];
          listaC[j].esCliente = true;
        }
      }
    }
    return listaC;
  }

  listaAdmin(listaAdmin: any) {
    for (let i = 0; i < environment.variables.nombreRepartidores.length; i++) {
      for (let j = 0; j < listaAdmin.length; j++) {
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
