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
      for(let i = 0; i < item.length; i++){
        if(item[i]["estado"] == "espera"){
          this.pedidos.push(item[i]);
        }
      }
      
      
    });
    
    this.repartidoresSuscribe = this.deliveryManService.getRepartidores().subscribe((item: any) =>{     
      this.repartidores = item;
    });
    

  }

  assinggnOrder(pedido: Orders) {
    this.pedido = pedido;
    this.pedido.estado = "asignado";    
    this.idPedido = pedido["idPedido"];   
    this.pedidoService.updatePedidos(this.pedido);  
    this.repartidores.sort(function(a,b){
      if(a.cantidad < b.cantidad){
        return -1;
      }
    });
    this.listaPedidos = this.repartidores[0]["pedidos"]; 
    
    this.listaPedidos.push({"idPedido":this.idPedido,"idCliente": this.pedido.idCliente});
     
    this.repartidores[0]["cantidad"] = this.listaPedidos.length;
    /*console.log(this.repartidores[0]["idRepartidor"],'--',this.repartidores[0]["cedula"],'--',this.repartidores[0]["nombre"])
    console.log(this.listaPedidos); 
    console.log(this.repartidores[0]["cantidad"]);*/ 
    this.deliveryManService.updateDeliveryMan(this.repartidores[0]);
     
    //this.notifyOrder(this.repartidores[0]);

  }

  
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

