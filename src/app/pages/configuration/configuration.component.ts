import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { UsersService } from "app/core/services/user/users.service";
import { AuthService } from "app/core/services/auth/auth.service";
import { environment } from "environments/environment";

import { Usuarios } from "app/core/interface/Usuarios";
import { UserInfoService } from "app/core/services/userInfo/user-info.service";

import { NgxSpinnerService } from "ngx-spinner";
import { UsuarioInterface } from "app/core/interface/usuario-interface";

import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { Seguridad } from "app/core/utils/seguridad";

@Component({
  selector: "app-configuration",
  templateUrl: "./configuration.component.html",
  styleUrls: ["./configuration.component.css"],
})
export class ConfigurationComponent implements OnInit {
  userForm: FormGroup;
  id: string;
  data: any = "";
  direccion: string;
  referencia: string;
  coordenadas: string;
  usuario: Usuarios;
  private datosUsuario: Usuarios;
  UsuarioComp = {};
  private datosRespaldo: any;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private user: UserInfoService,
    private userS: UsersService,
    private http: HttpClient,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.usuarioLog();

    this.cargar();
  }

  cargar() {
    console.log(localStorage.getItem("cedula"));
    const subs = this.userS.userById(localStorage.getItem("cedula")).subscribe(
      (data: any) => {
        console.log(data);
        this.usuario = data;
      },
      (err: any) => {
        console.log(err);
        subs.unsubscribe();
      }
    );
  }

  usuarioLog() {
    this.UsuarioComp = {
      cedula: this.auth.dataUser["cedula"],
      nombre: this.auth.dataUser["nombre"],
      apellido: this.auth.dataUser["apellido"],
      telefono: this.auth.dataUser["telefono"],
      email: this.auth.dataUser["email"],
      direccion: this.auth.dataUser["direccion"],
      contrasenia: this.auth.dataUser["contrasenia"],
      rol: this.auth.dataUser["rol"],
    };
  }

  public submit() {
    console.log(this.userForm.value);
  }

  getAddress(address: any) {
    const obj = JSON.parse(address);
    this.direccion = obj.direccion;
    this.referencia = obj.referencia;
    this.coordenadas = obj.coordenadas;
  }

  buildForm() {
    this.userForm = this.formBuilder.group({
      nombre: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
      ]),
      apellido: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
      ]),
      contrasenia: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
      ]),
      direccion: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern(environment.emailPatter),
      ]),
      telefono: new FormControl("", [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern(environment.phonePatter),
      ]),
      referencia: new FormControl("", [Validators.required]),
    });
    this.datosRespaldo = this.userForm.value;
  }

  public getError(controlName: string): string {
    let field: string;
    const control = this.userForm.get(controlName);
    if (control.errors != null) {
      if (control.errors.required != null) {
        field = controlName;
        if (controlName === "nombre") {
          field = "Nombre";
        } else if (controlName === "apellido") {
          field = "Apellido";
        } else if (controlName === "contrasenia") {
          field = "Contraseña";
        } else if (controlName === "telefono") {
          field = "Tel&eacute;fono";
        } else if (controlName === "email") {
          field = "Correo Electrónico";
        } else if (controlName === "direccion") {
          field = "Dirección";
        }
        return "El campo " + field + " es requerido.";
      }
      if (control.errors.pattern != null) {
        if (controlName === "telefono") {
          field = "Tel&eacute;fono";
        } else if (controlName === "email") {
          field = "Correo Electr&oacute;nico";
        }
        return "Ingrese un " + field + " válido";
      }
    }
    return "";
  }

  guardarCambios() {
    this.datosUsuario = {
      cedula: this.auth.dataUser["cedula"],
      nombre: this.userForm.get("nombre").value,
      apellido: this.userForm.get("apellido").value,
      telefono: this.userForm.get("telefono").value,
      email: this.userForm.get("email").value,
      direccion: this.userForm.get("direccion").value,
      contrasenia: this.userForm.get("contrasenia").value,
      rol: this.auth.dataUser["rol"],
    };

    this.userS.setUserInfo(this.datosUsuario).subscribe(
      (item) => {
        console.log("Ingreso correcto");
        this.showMessage(
          "Usuario editado con &eacute;xito",
          "success",
          "Editado!"
        );
      },
      (error) => {
        console.log(error);
        this.showMessage("Error al editar el usuario", "error", "Error!");
      }
    );
  }

  confirmarEditar() {
    this.confirmationService.confirm({
      message: "¿Est&aacute; seguro que deseas editar el usuario?",
      accept: () => {
        this.guardarCambios();
      },
    });
  }

  showMessage(mensaje: string, tipo: string, titulo: string) {
    this.messageService.add({
      severity: tipo,
      summary: titulo,
      detail: mensaje,
      life: 4000,
    });
  }

  clearState() {
    this.userForm.reset();
  }
}
