import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { CustomerNews } from "../../core/interface/customerNews";
import { ConfirmationService } from "primeng/api";
import { HttpClientModule } from "@angular/common/http";

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
  token:any;
  display: boolean = false;
  cols: any[];
  dato: string;
  envU = environment;
  listCustomerNews: CustomerNews[];

  constructor(
    private confirmationService: ConfirmationService,
    private http: HttpClient,
    private userNotification: UserNotificationService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {

    this.token = this.authService.getJwtToken();
    this.userNotification.clienteNotification(this.token).subscribe((data: any) => {
      this.listCustomerNews = data;
    });

    this.dato = this.envU.variables.usuarioL['data']["cedula"];
    console.log(this.dato);
    this.buildForm();
  }

  showAddDialog() {
    this.display = true;
  }

  eliminarClienteNovedad(customernews){
    console.log("Eliminar novedad de cliente");
  }
  
  addNovedad(){
    let novedadAdmin: CustomerNews = {
      idusuarioReportado: this.form.get("cedula").value,
      descripcion: this.form.get("novedad").value,
      idusuarioReporta: "Admin",
    };

    this.userNotification.pushUserNotification();
    this.clearState();
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
}
