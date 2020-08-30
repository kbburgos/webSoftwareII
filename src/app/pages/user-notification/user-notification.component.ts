import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CustomerNewsView } from "../../core/interface/customerNewsView";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { NoveltyService } from "../../core/services/novelty/novelty.service";
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
  form: FormGroup;
  token: any = this.authService.getJwtToken();
  display: boolean = false;
  dato: string;
  novedadAdmin: any[];
  customernewsView: CustomerNewsView[];
  cols: any[];
  private adminNoveltySubscribe;
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

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for loading the functions in the system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Brenda Bermello <bremiber@espol.edu.ec>
   */
  ngOnInit() {
    this.buildForm();
    this.cargar();
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for capturing the names and surnames of deliveryman. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Brenda Bermello <bremiber@espol.edu.ec>
   */
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

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for capturing the names and surnames of customers. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Brenda Bermello <bremiber@espol.edu.ec>
   */
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

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for capturing the names and surnames of deliveryman for novelty. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Brenda Bermello <bremiber@espol.edu.ec>
   */
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
        }
      }
    }
    return listaAdmin;
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for loading customer and novelty information from API. <br> Creation Date: 08/22/2020
   * @type {Promise<void>} Void type promise.
   * @returns {JSON} JSON users
   * @author Karla Burgos <kbburgos@espol.edu.ec>
   */
  cargar() {
    this.spinner.show();
    this.userNotification
      .clienteNotification(this.token)
      .subscribe((data: any) => {
        this.customernewsView = this.listaFiltroClientes(
          this.listaFiltroRepartidores(data)
        );
      });

    let adminNoveltySubscribe = this.novelty
      .getnovedadesReporta(this.token, this.authService.dataUser.cedula)
      .subscribe(
        (data: any) => {
          this.novedadAdmin = this.listaAdmin(data);
          this.spinner.hide();
        },
        (err: any) => {
          adminNoveltySubscribe.unsubscribe();
          this.showMessage(
            "Error al cargar las novedades realizadas por el Administrador",
            "error",
            "Error!"
          );
        }
      );
    //this.spinner.hide();
  }

  showAddDialog() {
    this.display = true;
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method takes care of adding a novelty. <br> Creation Date: 08/17/2020
   * @type {Promise<void>} Void type promise.
   * @author Karla Burgos <kbburgos@espol.edu.ec>
   */
  addNovedad() {
    const novedadNueva = {
      idusuarioReporta: this.authService.dataUser["cedula"],
      idusuarioReportado: this.form.get("cedula").value,
      descripcion: this.form.get("novedad").value,
    };
    this.novelty.addNovelty(this.token, novedadNueva).subscribe(
      (item) => {
        this.cargar();
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
        Validators.maxLength(10),
      ]),
      novedad: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method gets the forms fields validation. <br> Creation Date: 08/24/2020
   * @returns {string} string form invalid field
   * @author Brenda Bermello <bremiber@espol.edu.ec>
   */
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

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for unsubscribe methods in the system. <br> Creation Date: 08/27/2020
   * @type {Promise<void>} Void type promise.
   * @author Brenda Bermello <bremiber@espol.edu.ec>
   */
  ngOnDestroy() {
    if (this.adminNoveltySubscribe) {
      this.adminNoveltySubscribe.unsubscribe();
    }
  }
}
