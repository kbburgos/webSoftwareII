import { Component, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ConfirmationService } from "primeng/api";
import { DelivermanReporterService } from "../../core/services/deliverman/deliverman-reporter.service";
import { NovelyDeliverman } from "../../core/interface/noveltyDeliverman";
import { NovelyCustomerView } from "../../core/interface/noveltyCustomerView";
import { NgxSpinnerService } from "ngx-spinner";

import { UsersService } from "../../core/services/user/users.service";
import { NoveltyService } from "../../core/services/novelty/novelty.service";
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
  templateUrl: './conflicting.component.html',
  styleUrls: ['./conflicting.component.css']
})
export class ConflictingComponent implements OnInit {
  private form: FormGroup;
  token: any = this.authService.getJwtToken();
  cont: number = 0;
  displayNovelty=false;
  //listconflicting: Conflicting[];
  listcustomers: Usuarios[];
  clientesTodos: Usuarios[];
  clientesConflictivos: NovelyCustomerView[];
  deliverymannew: NovelyDeliverman[];
  novedadesLista: [];
  direccion: string;
  referencia: string;
  coordenadas: string;
  cols: any=[
    { field: "cedula", header: "CEDULA" },
    { field: "nombre", header: "NOMBRE" },
    { field: "apellido", header: "APELLIDO" },
  ];

  constructor(private confirmationService: ConfirmationService,
    private http: HttpClient,
    private deliverymanreportService: DelivermanReporterService,
    private user: UsersService,
    private novelty: NoveltyService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
  ) { }

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
    this.spinner.show();
    this.buildForm();
    this.clearState();
    let novedadesSubscribe = this.deliverymanreportService.getNovedadesRepartidores().subscribe((data:any)=>{
      this.clientesConflictivos=this.listaClientesConflictivos(this.deleteDuplicate(data));
      this.spinner.hide();
    })

  }

      /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for searching the conflicting custumers. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @returns {JSON} JSON customer
   * @author Brenda Bermello <bremiber@espol.edu.ec>
   */
  listaClientesConflictivos(lista: any){
    for(let i=0; i<environment.variables.nombreClientes.length; i++){
      for(let j=0; j<lista.length; j++){
        if(environment.variables.nombreClientes[i]['cedula'] === lista[j].idCliente){
          lista[j].nombre = environment.variables.nombreClientes[i]['nombre'];
          lista[j].apellido = environment.variables.nombreClientes[i]['apellido'];
          lista[j].email = environment.variables.nombreClientes[i]['email'];
          this.getAddress(environment.variables.nombreClientes[i]['direccion']);
          lista[j].direccion= this.direccion;
          lista[j].telefono = environment.variables.nombreClientes[i]['telefono'];
          lista[j].rol = environment.variables.nombreClientes[i]['rol'];
        }
      }
    }
    return lista;
  }

  getAddress(address:any){
    const obj=JSON.parse(address);
    this.direccion=obj.direccion;
    this.referencia=obj.referencia;
    this.coordenadas=obj.coordenadas;
  }

        /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for deleting the conflicting custumers. <br> Creation Date: 08/25/2020
   * @type {Promise<void>} Void type promise.
   * @returns {JSON} JSON customer
   * @author Brenda Bermello <bremiber@espol.edu.ec>
   */
  deleteDuplicate(coleccion: any){
    const unique=[];
    let count=0;
    let found=false;
    for(let i=0; i<coleccion.length; i++){
      for(let j=0; j<unique.length; j++){
        if(coleccion[i].idCliente == unique[j].idCliente){
          found=true;
        }
      }
      count++;
      if(count==1 && found ==false){
        unique.push(coleccion[i]);
      }
      count=0;
      found=false;
    }
    return unique;
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

  detalleNovedad(idCliente){
    this.displayNovelty = true;
    let reportadoSubscribe=this.novelty.getnovedadesReportado(this.token, idCliente).subscribe((data:any)=>{
      this.novedadesLista=data;
    })
  }

  clearState() {
    this.form.reset();
  }
}

