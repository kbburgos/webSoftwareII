import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'app/services/pedido.service';
import { DeliverymanService } from 'app/services/deliveryman.service';
import { Orders } from 'app/resource/interface/orders';
import { AuthService } from 'app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Deliveryman } from 'app/resource/interface/deliveryman';
@Component({
  selector: 'app-assigned',
  templateUrl: './assigned.component.html',
  styleUrls: ['./assigned.component.css']
})
export class AssignedComponent implements OnInit {
  nombreRepartidor:string;
  apellidoRepartidor:string;
  telefonoRepartidor:string;
  cedulaRepartidor:string;

  pedidosAsignados: Orders[];
  display: boolean = false;
  cols: any;
  token: any;
  listaRepartidores: any;
  repartidorxPedido: Deliveryman;
  private pedidosAsignadosSuscribe;
  private repartidoresSusbscribe;

  constructor(
    private pedidoService: PedidoService,
    private http: HttpClient,
    private deliveryManService: DeliverymanService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.pedidosAsignados = [];
    this.pedidosAsignadosSuscribe = this.pedidoService.getPedidosByEstado(1).subscribe((item: any) => {  
      this.pedidosAsignados = item;
      console.log(this.pedidosAsignados);
    });

    this.repartidoresSusbscribe = this.deliveryManService.getRepartidores().subscribe((item: any) =>{
      this.listaRepartidores = item;
      
    });

  }
  viewMoreInformation(pedidosAsignados: Orders){
    this.display = true;
    for(const repartidor of this.listaRepartidores){
      for(const pedido of repartidor.pedidos){
        if(pedido.idPedido == pedidosAsignados.idPedido){
          this.repartidorxPedido = repartidor;
        }
      }
    }
    this.nombreRepartidor = this.repartidorxPedido.nombre;
    this.apellidoRepartidor = this.repartidorxPedido.apellido;
    this.cedulaRepartidor = this.repartidorxPedido.cedula;
    this.telefonoRepartidor = this.repartidorxPedido.telefono;





  }

  ngOnDestroy(){
    if(this.pedidosAsignadosSuscribe){
      this.pedidosAsignadosSuscribe.unsubscribe();
    }
  }

}
