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
  listaPedidos;
  private pedidosSuscribe;
  private repartidoresSuscribe;

  constructor(private pedidoService: PedidoService, private deliveryManService: DeliverymanService) { }

  ngOnInit() {
    this.pedidos = [];
    this.repartidores = [];
    this.listaPedidos = [];
    this.pedidosSuscribe = this.pedidoService.getPedidos().subscribe((item: any) => {   
      this.pedidos = item;
      console.log("HELLO MUNDO ", item);
      
    });

    

  }

  showDialogOnHold(pedido: Orders) {
    this.display = true;
    this.idPedido = pedido["idPedido"];
    this.repartidoresSuscribe = this.deliveryManService.getRepartidores().subscribe((item: any) =>{     
      for(let i = 0; i < item.length; i++){
        item[i]["cantidad"] = item[i]["pedidos"].length;
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

    this.listaPedidos = repartidor["pedidos"]; 
    if(this.idPedido == undefined || this.idPedido == null){
      alert("El pedido ya fué asignado");
    }else{
      this.listaPedidos.push(this.idPedido);
      repartidor["cantidad"] = this.listaPedidos.length;
      this.deliveryManService.updateDeliveryMan(repartidor);
      this.pedidoService.deletePedido(this.idPedido);
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
}

