import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DeliverymanService } from 'app/core/services/deliverman/deliveryman.service';
import { Deliveryman } from 'app/core/interface/deliveryman';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { environment} from 'environments/environment';
import { AuthDeliverymanService } from 'app/core/services/deliverman/auth-deliveryman.service';
import { UserInfoService } from 'app/core/services/userInfo/user-info.service';
@Component({
  selector: 'app-deliveryman',
  templateUrl: './deliveryman.component.html',
  styleUrls: ['./deliveryman.component.css'],
  providers: [MessageService]
})
export class DeliverymanComponent implements OnInit {
  idRepartidor: string;
  form: FormGroup;
  repartidoresFirebase: any;
  repartidor: any;
  dato: Deliveryman[];
  encryptdata;
  private login;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private deliveryManService: DeliverymanService,
    private auth: AuthDeliverymanService,
    private messageService: MessageService,
    private userInfo: UserInfoService,
    private http: HttpClient
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
              this.auth.saveIdStorage(
                this.dato[0]['cedula']
              );
              this.router.navigate(['delivery-order']);
            } else {
              this.showDialog('Su usuario o contraseña son incorrectos');
            }
          },
          (err) => {
            this.showDialog('No se pudo verificar el usuario');
          }
        );
    } else {
      this.showDialog('El formulario es inválido');
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      cedula: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required]),
    });
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    if (this.repartidor) {
      this.repartidor.unsubscribe();
    }
  }

  showDialog(value: string) {
    this.messageService.clear();
    this.messageService.add(
      {severity: 'error', summary: 'Error!',
      detail: value, life: 2000 });
  }
}
