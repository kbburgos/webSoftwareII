import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'app/services/pedido.service';
import { DeliverymanService } from 'app/services/deliveryman.service';
import { Orders } from 'app/resource/interface/orders';

@Component({
  selector: 'app-assigned',
  templateUrl: './assigned.component.html',
  styleUrls: ['./assigned.component.css']
})
export class AssignedComponent implements OnInit {
  pedidosAsignados: Orders[];
  cols: any;
  private pedidosAsignadosSuscribe;

  constructor(private pedidoService: PedidoService, private deliveryManService: DeliverymanService) { }

  ngOnInit(): void {
    this.pedidosAsignados = [];

    this.pedidosAsignadosSuscribe = this.pedidoService.getPedidos().subscribe((item: any) => {  
      console.log(item);
      for(let i = 0; i < item.length; i++){
        if(item[i]["estado"] == "asignado"){
          this.pedidosAsignados.push(item[i]);
        }
      }
      
      
    });

  }

  ngOnDestroy(){
    if(this.pedidosAsignadosSuscribe){
      this.pedidosAsignadosSuscribe.unsubscribe();
    }
  }

}
