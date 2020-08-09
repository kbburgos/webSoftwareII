import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "app/services/auth.service";
import { DeliverymanService } from "app/services/deliveryman.service";
import { Deliveryman } from "app/resource/interface/deliveryman";
import * as CryptoJS from "crypto-js";

@Component({
  selector: "app-deliveryman",
  templateUrl: "./deliveryman.component.html",
  styleUrls: ["./deliveryman.component.css"],
})
export class DeliverymanComponent implements OnInit {
  idRepartidor: string;
  form: FormGroup;
  repartidoresFirebase: any;
  repartidor: any;
  dato: Deliveryman[];
  encryptdata;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private deliveryManService: DeliverymanService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ingresar() {
    if (this.form.valid) {
      this.repartidor = this.deliveryManService
        .getRepartidorLogin(this.form.value.cedula, this.form.value.pass)
        .subscribe(
          (data: any) => {
            this.dato = data;

            if (this.dato.length > 0) {
              console.log(this.dato);
              this.deliveryManService.setdeliverIdStorage(
                this.dato[0]["cedula"]
              );
              this.router.navigate(["delivery-order"]);
            } else {
              alert("Su usuario o contraseña son incorrectos");
            }
          },
          (err) => {
            console.log(err);
            alert("Algo salió mal");
          }
        );
    } else {
      alert("El formulario es inválido");
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      cedula: new FormControl("", [Validators.required]),
      pass: new FormControl("", [Validators.required]),
    });
  }

  ngOnDestroy() {
    if (this.repartidor) {
      this.repartidor.unsubscribe();
    }
  }
}
