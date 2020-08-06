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
    
    this.repartidores = [];
    this.listaPedidos = [];
    this.pedidosSuscribe = this.pedidoService.getPedidos().subscribe((item: any) => {  
      this.pedidos = []; 
      console.log(item);
     // this.pedidos = item;
      for(let i = 0; i < item.length; i++){
        if(item[i]["estado"] == "espera"){
          //console.log(item[i]["estado"]);
          this.pedidos.push(item[i]);
          //console.log(this.pedidos);
        }
      }
      
      
    });
    
    this.repartidoresSuscribe = this.deliveryManService.getRepartidores().subscribe((item: any) =>{     
      this.repartidores = item;
    });
    

  }

  assinggnOrder(pedido: Orders) {
    this.pedido = pedido;
    //this.pedido.estado = "asignado";    
    this.idPedido = pedido["idPedido"];   
    //this.pedidoService.updatePedidos(this.pedido);
    
    this.repartidores.sort(function(a,b){
      if(a.cantidad < b.cantidad){
        return -1;
      }
    });
    console.log(this.repartidores);
    this.listaPedidos = this.repartidores[0]["pedidos"]; 
    this.listaPedidos.push(this.idPedido);
    this.repartidores[0]["cantidad"] = this.repartidores[0]["pedidos"].length;
    console.log(this.repartidores[0]);
    this.deliveryManService.updateDeliveryMan(this.repartidores[0]);
    this.notifyOrder(this.repartidores[0]);

  }


  /*assignOrderOnHold(repartidor: Deliveryman){
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

    
  }*/
  
  ngOnDestroy(): void{
    if(this.pedidosSuscribe){
      this.pedidosSuscribe.unsubscribe();
    }
    if(this.repartidoresSuscribe){
      this.repartidoresSuscribe.unsubscribe();
    }
  }

  notifyOrder(repartidor: Deliveryman){
    console.log(repartidor);
    let telefono = '593'+repartidor.telefono;
    let text = "Hola%20"+repartidor["nombre"]+"%20"+repartidor["apellido"]+"%20,"+"%20debes%20entregar%20el%20siguiente%20pedido%20";
    let pedido = "%20:%20"+this.pedido.idPedido+"%20"; 
    let url = "https://www.youtube.com/?hl=es&gl=EC"; 
    let url_prueba = "http://localhost:4200/login";
    let cuerpo_mensaje = 
      "Hola "+repartidor.nombre+" "+repartidor.apellido+" "+
      "Tienes un nuevo pedido por entregar: "+
      "*"+this.pedido.idPedido+"*"+
      "Ingresa a este enlace para finalizar el pedido cuando lo hayas entregado: "+
      url_prueba;





    window.open('https://api.whatsapp.com/send?phone='+telefono+'&text='+cuerpo_mensaje);
    
  }
}

