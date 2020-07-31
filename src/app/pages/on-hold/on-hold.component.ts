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

  constructor(private pedidoService: PedidoService, private deliveryManService: DeliverymanService) { }

  ngOnInit() {
    this.pedidos = [];
    this.repartidores = [];
    let sub = this.pedidoService.getPedidos().subscribe((item: any) => {   
      this.pedidos = item;
      //console.log("HELLO MUNDO ", item);
    });

    let rep = this.deliveryManService.getRepartidores().subscribe((item: any) =>{
      this.repartidores = item;
      //console.log("HELLO MUNDO ", item);
    })

  }

  showDialogOnHold() {
    this.display = true;
  }

  deleteOnHold() {
    let index = this.listonhold.indexOf(this.selectedOnHold);
    this.listonhold = this.listonhold.filter((val, i) => i != index);
    this.display = false;
  }
}

