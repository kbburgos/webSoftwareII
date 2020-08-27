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
  direccion: string;
  referencia: string;
  coordenadas: string;

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

    let subs = this.user.usuarios().subscribe(
      (data: any) => {
        this.clientes=this.filtrado(data);
      },
      (err: any) => {
        console.log(err);
        subs.unsubscribe();
      }
    );
  }

  filtrado(coleccion){
    const temporal: any[]= [];
    coleccion.map((item)=>{
      if(item.rol == 3){
        this.getAddress(item.direccion);
        item.direccion=this.direccion;
        temporal.push(item);
      }
    });
    return temporal;
  }

  getAddress(address:any){
    const obj=JSON.parse(address);
    this.direccion=obj.direccion;
    this.referencia=obj.referencia;
    this.coordenadas=obj.coordenadas;
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
