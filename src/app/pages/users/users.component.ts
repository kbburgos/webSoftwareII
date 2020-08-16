import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { UsersService } from "../../core/services/user/users.service";
import { AuthService } from "../../core/services/auth/auth.service";
import { environment } from "environments/environment";

import { Usuarios } from "../../core/interface/Usuarios";

import { NgxSpinnerService } from "ngx-spinner";

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";

@Component({
  selector: "app-promotions",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  private form: FormGroup;

  token: any = this.auth.getJwtToken();
  usuarios: Usuarios[];

  display: boolean = false;

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
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {


    console.log("ESTAS EN TOKEN en usuario ",this.auth.token)

    
    this.spinner.show();
    this.buildForm();
    this.clearState();
    console.log(this.token)

    let subs = this.user.usuarios(this.token).subscribe(
      (data: any) => {
        console.log(data)
        this.usuarios = data;
        this.spinner.hide();
        console.log(this.usuarios);
      },
      (err: any) => {
        console.log(err);
        this.spinner.hide();
        subs.unsubscribe();
      }
    );
  }

  private buildForm() {
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

  clearState() {
    this.display = false;
    this.form.reset();
  }
}
