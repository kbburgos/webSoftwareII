import { Component, OnInit } from "@angular/core";
import { DelivermanReporterService } from "../../core/services/deliverman/deliverman-reporter.service";
import { DeliverymanService } from "../../core/services/deliverman/deliveryman.service";
import { NovelyDeliverman } from "../../core/interface/noveltyDeliverman";
import { ConfirmationService } from "primeng/api";
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";

@Component({
  selector: "app-delivery-notification",
  templateUrl: "./delivery-notification.component.html",
  styleUrls: ["./delivery-notification.component.css"],
})
export class DeliveryNotificationComponent implements OnInit {
  private form: FormGroup;
  display: boolean = false;
  bandera: boolean = false;
  deliverymannew: NovelyDeliverman[];
  listanovedades: Array<any> = [];
  dato: string;
  envU = environment;

  cols: any[];

  constructor(
    private deliverymanreportService: DelivermanReporterService,
    private deliverymanService: DeliverymanService,
    private confirmationService: ConfirmationService,
    private http: HttpClient,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit() {
    let sub = this.deliverymanreportService.getNovedadesRepartidores().subscribe((item: any) => {
      this.deliverymannew = item;

    });

    this.dato = this.envU.variables.usuarioL['data']['cedula'];
    console.log(this.dato);
    this.buildForm();
  }

  

  showAddDialog() {
    this.display = true;
  }

  eliminarRepartidorNovedad(novelydeliverman){
    this.deliverymanreportService.deleteNovedadRepartidor(novelydeliverman.idNovedad);
  }

  addNovedad(){
    let novedadAdmin: NovelyDeliverman = {
      idCliente: this.form.get('idCliente').value,
      novedad: this.form.get('novedad').value,
      idRepartidor: this.dato,
    };

    this.deliverymanreportService.pushPedidoFinal(novedadAdmin);
    this.clearState();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      idCliente: new FormControl("", [
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
