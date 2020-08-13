import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'app/services/pedido.service';
import { DeliverymanService } from 'app/services/deliveryman.service';
import { Orders } from 'app/resource/interface/orders';
import { AuthService } from 'app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Deliveryman } from 'app/resource/interface/deliveryman';
import { Producto } from 'app/models/producto';
import { ProductoService } from 'app/services/producto.service';
@Component({
  selector: 'app-assigned',
  templateUrl: './assigned.component.html',
  styleUrls: ['./assigned.component.css']
})
export class AssignedComponent implements OnInit {
  nombreRepartidor: string;
  apellidoRepartidor: string;
  telefonoRepartidor: string;
  cedulaRepartidor: string;
  displayDetail = false;
  displayDeliveryman = false;
  cols: any[];
  pedidosDomicilioAsignados: Orders[] = [];
  productos: Producto[];
  listaProductos: Array<any> = [];
  listaRepartidores: Deliveryman[];
  cantidadTotalProductosxPedido: number;
  repartidorxPedido: Deliveryman;
  private pedidosAsignadosSubscribe;
  private repartidoresSubscribe;
  private productosSubscribe

  constructor(
    private pedidoService: PedidoService,
    private http: HttpClient,
    private deliveryManService: DeliverymanService,
    private productService: ProductoService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.pedidosAsignadosSubscribe = this.pedidoService.getPedidosByEstado(1).subscribe((item: any) => {
      this.pedidosDomicilioAsignados = item;
    });

    this.productosSubscribe = this.productService.getProductos().subscribe((item: any ) => {
      this.productos = item;
    });
    this.repartidoresSubscribe = this.deliveryManService.getRepartidores().subscribe((item: any) => {
      this.listaRepartidores = item;
    });
  }
  viewMoreInformationDelivery(pedidosAsignados: Orders) {
    this.displayDeliveryman = true;
    for (let i = 0; i < this.listaRepartidores.length; i++) {
      for (let j = 0; j < this.listaRepartidores[i].pedidos.length; j++ ) {
        if (pedidosAsignados.idPedido === this.listaRepartidores[i].pedidos[j]) {
          this.repartidorxPedido = this.listaRepartidores[i];
        }
      }
    }
    this.nombreRepartidor = this.repartidorxPedido.nombre;
    this.apellidoRepartidor = this.repartidorxPedido.apellido;
    this.cedulaRepartidor = this.repartidorxPedido.cedula;
    this.telefonoRepartidor = this.repartidorxPedido.telefono;
  }

  detailsProducts(productos: [], cantidades: []) {
    this.displayDetail = true;
    this.listaProductos = [];
    let  productofinal = {};
    for (let i = 0 ; i < productos.length; i++) {
      for (let j = 0 ; j < this.productos.length; j++) {
        if ( productos[i] === this.productos[j].idProducto ) {
          productofinal = {
            'producto' : this.productos[j].nombre,
            'cantidad' :  cantidades[i]
          }
          this.listaProductos.push(productofinal);
        }
      }
    }
    this.cantidadTotalProductosxPedido = cantidades.reduce( (a, b) => a + b , 0);
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    if (this.pedidosAsignadosSubscribe) {
      this.pedidosAsignadosSubscribe.unsubscribe();
    }
    if (this.repartidoresSubscribe) {
      this.repartidoresSubscribe.unsubscribe();
    }
    if (this.productosSubscribe) {
      this.productosSubscribe.unsubscribe();
    }
  }

}
