import { Component, OnInit } from '@angular/core';
import { DeliverymanService } from 'app/services/deliveryman.service';
import { Deliveryman } from 'app/resource/interface/deliveryman';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { DelivermanReporterService } from 'app/services/deliverman-reporter.service';
import { NovelyDeliverman } from 'app/resource/interface/noveltyDeliverman';

@Component({
  selector: 'app-delivery-order',
  templateUrl: './delivery-order.component.html',
  styleUrls: ['./delivery-order.component.css']
})
export class DeliveryOrderComponent implements OnInit {

  textarea: string;
  private deliveryman;
  repartidor : Deliveryman;
  cedulaRepartidor: string;
  cols: any[];
  display:boolean = false;
  listaPedidosRepartidor: Array<string> = [];
  pedidoid : string;
  pedido: any;
  dato: any;
  ordenFinalizada : NovelyDeliverman;
  private novedades;
  private enviarNovedad;

  constructor(
    private deliveryManService: DeliverymanService,
    private confirmationService: ConfirmationService ,
    private activatedRoute: ActivatedRoute,
    private noveltyDelivermanService : DelivermanReporterService,

    
  ) { }

  ngOnInit() {
    this.cedulaRepartidor = this.deliveryManService.getdeliverIdStorage();

    this.deliveryman = this.deliveryManService.getDeliveryManByCedula(this.cedulaRepartidor).subscribe((data: any) =>{     
      this.dato = data[0]["pedidos"];
    },
    (err) =>{
      console.log(err);
      alert("Hubo un problema al cargar los pedidos");
    });

    this.novedades = this.noveltyDelivermanService.getNovedadesRepartidores().subscribe((data: any)=>{
      console.log(data);
    });


  }

  ngOnDestroy(){
    if(this.deliveryman){
      this.deliveryman.unsubscribe();
    }
  }

  assinggnOrder(pedidoCulminado){
    this.pedidoid = pedidoCulminado.idPedido;
    this.pedido = pedidoCulminado;
    this.display = true;

  }
  confirm() {
    console.log("enviar");
    this.confirmationService.confirm({
        message: '¿Está seguro?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-circle',
        accept: () => {
          this.display = false;
        },
        reject: () =>{

        }
    });
  }

  sendFinallyOrder(pedido){
    this.ordenFinalizada = {
      idPedido: pedido.idPedido,
      idRepartidor: this.cedulaRepartidor,
      novedad: this.textarea,
      idCliente: pedido.idCliente

    };

    this.enviarNovedad = this.noveltyDelivermanService.pushPedidoFinal(this.ordenFinalizada).then((data: any) => {
      console.log("Orden finalizada");
      this.display = false;
      this.textarea = "";
    })
    .catch((err: any) => {
      console.log(err);
    });
  }
}
