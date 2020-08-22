import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { UsersService } from "../../core/services/user/users.service";
import { AuthService } from "../../core/services/auth/auth.service";
import { environment } from "environments/environment";

import { Usuarios } from "app/core/interface/Usuarios";
import { Rol } from "app/core/interface/rol";
import { UserInfoService } from "app/core/services/userInfo/user-info.service";

import { NgxSpinnerService } from "ngx-spinner";
import { UsuarioInterface } from "app/core/interface/usuario-interface";

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { async } from "@angular/core/testing";

@Component({
  selector: "app-promotions",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  form: FormGroup;
  token: any = this.auth.getJwtToken();
  usuarios: Usuarios[];
  temp: any[] = [];
  column: any = "";
  display: boolean = false;
  rolName: String = "Rol";
  datosUsuario: UsuarioInterface;
  data: any = "";
  rol: number = 1;
  edit: boolean = false;
  UsuarioEdit: UsersService;

  cols = [
    { field: "cedula", header: "Cedula" },
    { field: "nombre", header: "Nombre" },
    { field: "apellido", header: "Apellido" },
    { field: "email", header: "Email" },
    { field: "direccion", header: "Direccion" },
    { field: "telefono", header: "Telefono" },
  ];

  constructor(
    private http: HttpClient,
    private user: UsersService,
    private auth: AuthService,
    private authService: AuthService,
    private userInfo: UserInfoService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.clearState();
    this.cargar();
  }

  cargar() {
    this.column = "";
    this.spinner.show();
    let subs = this.user.usuarios(this.token).subscribe(
      (data: any) => {
        console.log(data);
        this.usuarios = data;
        this.tableColumns(this.usuarios);
        this.data = data;
      },
      (err: any) => {
        console.log(err);
        this.spinner.hide();
        subs.unsubscribe();
      }
    );
  }

  async tableColumns(colection) {
    colection.map((usuario) => {
      let User: Usuarios = {
        apellido: usuario.apellido,
        cedula: usuario.cedula,
        contrasenia: usuario.contrasenia,
        direccion: usuario.direccion,
        email: usuario.email,
        nombre: usuario.nombre,
        rol: usuario.rol,
        telefono: usuario.telefono,
      };
      this.temp.push(User);
      this.column = this.temp;
      this.spinner.hide();
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      cedula: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
      nombre: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
      apellido: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
      direccion: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
      telefono: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  newUser() {
    this.display = true;
  }

  save() {
    console.log("entra a save");
    this.data = "";
    //let clave = String(Math.random() * (999999999 - 111111111) + 111111111);
    this.datosUsuario = {
      cedula: this.form.get("cedula").value,
      nombre: this.form.get("nombre").value,
      apellido: this.form.get("apellido").value,
      telefono: this.form.get("telefono").value,
      email: this.form.get("email").value,
      contrasenia: "contrasenia",
      rol: this.rol,
      direccion: this.form.get("direccion").value,
    };

    this.user
      .guardarUser(this.datosUsuario)
      .toPromise()
      .then((data: any) => {
        console.log("Parece que si");
        this.display = false;
        this.cargar();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  clearState() {
    this.display = false;
    this.form.reset();
  }

  guardarRol(rol: Number) {
    if (rol == 1) {
      this.rolName = "admin";
      this.rol = 1;
    } else {
      this.rolName = "vendedor";
      this.rol = 2;
    }
  }

  abrirEditar(user) {
    console.log("LLEGAS");
    this.edit = true;
    this.UsuarioEdit = user;

    console.log(this.UsuarioEdit);
  }

  //TIENE FALLAS
  guardarCambios() {
    this.datosUsuario = {
      cedula: this.form.get("cedula").value,
      nombre: this.form.get("nombre").value,
      apellido: this.form.get("apellido").value,
      telefono: this.form.get("telefono").value,
      email: this.form.get("email").value,
      contrasenia: "contrasenia",
      rol: this.rol,
      direccion: this.form.get("direccion").value,
    };

    this.user
      .setUserInfo(this.token, this.datosUsuario)
      .toPromise()
      .then((data) => {
        console.log("ingresado correctamente");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  EliminarUser(cedula: string) {
    this.data = "";
    this.user
      .deleteUser(this.token, cedula)
      .toPromise()
      .then((data) => {
        console.log("here we comes ");

        this.cargar();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
