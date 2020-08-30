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

/**
 * @classdesc Container class of DeliverymanComponent.
 * @desc Creation Date: 08/07/2020
 * @class
 * @public
 * @version 2.0.0
 * @author Danny Rios <dprios@espol.edu.ec>
 */
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

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for loading the functions in the system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  ngOnInit(): void {
    this.buildForm();
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for checking if a deliveryman exist in firebase. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  ingresar() {
    if (this.form.valid) {
      this.repartidor = this.deliveryManService
        .getRepartidorLogin(this.form.value.cedula, this.form.value.pass)
        .subscribe(
          (data: any) => {
            this.dato = data;

            if (this.dato.length > 0) {
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

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for building a form in page. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  private buildForm() {
    this.form = this.formBuilder.group({
      cedula: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required]),
    });
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for unsubscribe methods in the system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    if (this.repartidor) {
      this.repartidor.unsubscribe();
    }
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for showing message dialog in the system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  showDialog(value: string) {
    this.messageService.clear();
    this.messageService.add(
      {severity: 'error', summary: 'Error!',
      detail: value, life: 2000 });
  }
}
