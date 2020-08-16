import { Component, OnInit } from '@angular/core';
import { DeliverymanService } from 'app/core/services/deliverman/deliveryman.service';
import { Deliveryman } from 'app/core/interface/deliveryman';
import { ConfirmationService } from 'primeng/api';
import { DelivermanReporterService } from 'app/core/services/deliverman/deliverman-reporter.service';
import { NovelyDeliverman } from 'app/core/interface/noveltyDeliverman';
import { PedidoService } from 'app/core/services/pedido/pedido.service';
import { Orders } from 'app/core/interface/orders';

@Component({
  selector: 'app-delivery-order',
  templateUrl: './delivery-order.component.html',
  styleUrls: ['./delivery-order.component.css']
})
export class DeliveryOrderComponent implements OnInit {

  pedidoCambiaEstado : Orders;
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
  private obtenerpedido;
  private cambiarEstadoPedido;
  private updateRpartidor;

  constructor(
    private deliveryManService: DeliverymanService,
    private confirmationService: ConfirmationService ,
    private noveltyDelivermanService : DelivermanReporterService,
    private orderService: PedidoService,
    
  ) { }

  ngOnInit() {
    this.cedulaRepartidor = this.deliveryManService.getdeliverIdStorage();
    this.deliveryman = this.deliveryManService.getDeliveryManByCedula(this.cedulaRepartidor).subscribe((data: any) =>{ 
      this.repartidor = data[0];    
      this.dato = data[0]["pedidos"];
    },
    (err) =>{
      console.log(err);
      alert("Hubo un problema al cargar los pedidos");
    });


  }

  ngOnDestroy(){
    if(this.deliveryman){
      this.deliveryman.unsubscribe();
    }
    /*if(this.enviarNovedad){
      this.enviarNovedad.unsubscribe();
    }
    if(this.updateRpartidor){
      this.updateRpartidor.unsubscribe();
    }*/
    if(this.obtenerpedido){
      this.obtenerpedido.unsubscribe();
    }
    /*if(this.cambiarEstadoPedido){
      this.cambiarEstadoPedido.unsubscribe();
    }*/
  }

  assinggnOrder(pedidoCulminado){
    console.log(pedidoCulminado);
    this.pedidoid = pedidoCulminado.idPedido;
    this.pedido = pedidoCulminado;
    this.display = true;
    this.obtenerpedido = this.orderService.getPedidosByPedidoId(this.pedidoid).subscribe(data =>{
      this.pedidoCambiaEstado = data[0];
    },
    (err) =>{
      console.log(err);
      alert("Hubo un problema al cargar los pedidos");
    });
    

  }
  confirm() {
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
    //console.log(this.pedidoCambiaEstado);
    this.ordenFinalizada = {
      idPedido: pedido.idPedido,
      idRepartidor: this.cedulaRepartidor,
      novedad: this.textarea,
      idCliente: pedido.idCliente

    };
    //this.pedidoCambiaEstado.estado = "entregado";
    //console.log(this.pedidoCambiaEstado);
    this.cambiarEstadoPedido = this.orderService.updatePedidos(this.pedidoCambiaEstado);
    this.enviarNovedad = this.noveltyDelivermanService.pushPedidoFinal(this.ordenFinalizada).then((data: any) => {
      //console.log("Orden finalizada");
      this.display = false;
      this.textarea = "";
    })
    .catch((err: any) => {
      console.log(err);
    });

    for(let i = 0 ; i < this.dato.length; i++){
      if(this.dato[i].idPedido == pedido.idPedido){    
        this.dato.splice(i,1);
      }
    }

    this.updateRpartidor = this.deliveryManService.updateDeliveryMan(this.repartidor);
  }


}
