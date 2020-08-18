import { Component, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ConfirmationService } from "primeng/api";

import { UsersService } from "../../core/services/user/users.service";
import { AuthService } from "../../core/services/auth/auth.service";
import { environment } from "environments/environment";

import { Usuarios } from "../../core/interface/Usuarios";

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";

@Component({
  selector: 'app-promotions',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  private form: FormGroup;
  token: any = this.authService.getJwtToken();
  display: boolean = false;
  listcustomers: Usuarios[];
  customerEdit: Usuarios;

  clientes: Usuarios[];

  cols: any[];
  constructor(
    private confirmationService: ConfirmationService,
    private http: HttpClient,
    private user: UsersService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.clearState();

    let subs = this.user.usuarios(this.token).subscribe(
      (data: any) => {
        this.clientes = data;
        console.log(this.clientes);
      },
      (err: any) => {
        console.log(err);
        subs.unsubscribe();
      }
    );
  }

  eliminarCustomers(cedula){
    this.confirmationService.confirm({
      message: "¿Est&aacute; seguro que desea eliminar al cliente?",
      accept: () =>{
        this.user.deleteUser(this.token , cedula).toPromise().then(result => {
          console.log('From delete: ', result);
        });
        console.log(cedula, "usuario eliminado");
      },
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
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

  clearState() {
    this.display = false;
    this.form.reset();
  }

}
