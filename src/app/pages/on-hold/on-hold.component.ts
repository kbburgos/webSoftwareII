import { Component, OnInit} from '@angular/core';
import { OnHold } from '../../resource/interface/onhold';
import { PedidoService } from 'app/services/pedido.service';
import { Orders } from 'app/resource/interface/orders';
import { Deliveryman } from 'app/resource/interface/deliveryman';
import { DeliverymanService } from 'app/services/deliveryman.service';


@Component({
  selector: 'app-on-hold',
  templateUrl: './on-hold.component.html',
  styleUrls: ['./on-hold.component.css']
})
export class OnHoldComponent implements OnInit {
  display: boolean = false;
  selectedOnHold: OnHold;
  listonhold: OnHold[];
  cols: any[];
  selectedValue: string;
  pedidos : Orders[];
  repartidores:Deliveryman[];
  idPedido;
  prueba: Deliveryman[];
  repartidor: Deliveryman;
  listaPedidos;
  pedido: Orders;
  private pedidosSuscribe;
  private repartidoresSuscribe;

  constructor(private pedidoService: PedidoService, private deliveryManService: DeliverymanService) { }

  ngOnInit() {
    this.pedidos = [];
    this.repartidores = [];
    this.listaPedidos = [];
    this.pedidosSuscribe = this.pedidoService.getPedidos().subscribe((item: any) => {   

      this.pedidos = item;
      //console.log("PEDIDOS: ", item);
      
    });

    

  }

  showDialogOnHold(pedido: Orders) {
    this.pedido = pedido;
    this.display = true;
    this.idPedido = pedido["idPedido"];
    this.repartidoresSuscribe = this.deliveryManService.getRepartidores().subscribe((item: any) =>{     
      for(let i = 0; i < item.length; i++){
        console.log(i," - ",item[i]["idRepartidor"]," - ",item[i]["pedidos"]," - ",item[i]["cantidad"]);
        //item[i]["cantidad"] = item[i]["pedidos"].length;
        //console.log(item[i]["idRepartidor"]," ",item[i]["cantidad"] );
      }
      this.repartidores = item;
    })

  }

  deleteOnHold() {
    let index = this.listonhold.indexOf(this.selectedOnHold);
    this.listonhold = this.listonhold.filter((val, i) => i != index);
    this.display = false;
  }

  assignOrderOnHold(repartidor: Deliveryman){
    this.repartidor = repartidor;
    this.listaPedidos = repartidor["pedidos"]; 
    if(this.idPedido == undefined || this.idPedido == null || this.idPedido == '' || this.idPedido == " "){
      alert("El pedido ya fué asignado");
    }else{
      this.listaPedidos.push(this.idPedido);
      repartidor["cantidad"] = this.listaPedidos.length;
      this.idPedido = "";
      //this.deliveryManService.updateDeliveryMan(repartidor);
      //this.pedidoService.deletePedido(this.idPedido);
    }

    
  }
  
  ngOnDestroy(): void{
    if(this.pedidosSuscribe){
      this.pedidosSuscribe.unsubscribe();
    }
    if(this.repartidoresSuscribe){
      this.repartidoresSuscribe.unsubscribe();
    }
  }

  notifyOrder(){
    /*if(repartidor){
      alert.("Para notificar, debe asignar el pedido al repartidor");
    }*/
    console.log(this.repartidor);
    let text = "Hola%20"+this.repartidor["nombre"]+"%20"+this.repartidor["apellido"]+"%20,"+"%20debes%20entregar%20el%20siguiente%20pedido%20";
    let pedido = "%20:%20"+this.pedido.idPedido;  
    //repartidor.telefono
    window.open('https://api.whatsapp.com/send?phone='+'5930968918012'+'&text='+text+pedido);
    
  }
}

