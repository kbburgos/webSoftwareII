import { Component, OnInit} from '@angular/core';
import { OnHold } from '../../core/interface/onhold';
import { PedidoService } from 'app/core/services/pedido/pedido.service';
import { Orders } from 'app/core/interface/orders';
import { Deliveryman } from 'app/core/interface/deliveryman';
import { DeliverymanService } from 'app/core/services/deliverman/deliveryman.service';
import { ProductoService } from 'app/core/services/product/producto.service';
import { Producto } from 'app/core/models/producto';


@Component({
  selector: 'app-on-hold',
  templateUrl: './on-hold.component.html',
  styleUrls: ['./on-hold.component.css']
})
export class OnHoldComponent implements OnInit {
  display = false;
  productos: Producto[];
  listaProductos: Array<any> = [];
  repartidores: Deliveryman[];
  prueba: Deliveryman[];
  repartidor: Deliveryman;
  pedidosDomicilio: Orders[];
  pedidosLocal: Orders[];
  pedido: Orders;
  selectedOnHold: OnHold;
  listonhold: OnHold[];
  cols: any[];
  selectedValue: string;
  idPedido;
  listaPedidos;
  cantidadTotalProductosxPedido: number;
  private pedidosDomicilioSuscribe;
  private pedidosLocalSuscribe;
  private repartidoresSuscribe;
  private productosSubscribe;

  constructor(private pedidoService: PedidoService
    , private deliveryManService: DeliverymanService
    , private productService: ProductoService) { }

  ngOnInit() {
    this.pedidosDomicilio = [];
    this.pedidosLocal = [];
    this.repartidores = [];
    this.listaPedidos = [];

    this.pedidosDomicilioSuscribe = this.pedidoService.getPedidosByEstadoByTipo(0 , true).subscribe((item: any) => {
      this.pedidosDomicilio = item;
    });
    this.pedidosLocalSuscribe = this.pedidoService.getPedidosByEstadoByTipo(0 , false).subscribe((item: any) => {
      this.pedidosLocal = item;
    });
    this.repartidoresSuscribe = this.deliveryManService.getRepartidores().subscribe((item: any) => {
      this.repartidores = item;
    });

    this.productosSubscribe = this.productService.getProductos().subscribe((item: any ) => {
      this.productos = item;
    });

  }
  DetailsProducts(productos: [], cantidades: []) {
    this.display = true;
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

  assinggnOrder(pedido: Orders) {
    this.repartidores.sort(function(a, b) {
      if(a.pedidos.length < b.pedidos.length) {
        return -1;
      }
    });
    console.log(this.repartidores);
    this.pedido = pedido;
    this.pedido.estadoDelPedido = 1;
    this.pedidoService.updatePedidos(this.pedido);
    this.listaPedidos = this.repartidores[0].pedidos;
    this.listaPedidos.push(pedido.idPedido);
    this.repartidores[0].cantidad = this.listaPedidos.length;
    this.deliveryManService.updateDeliveryMan(this.repartidores[0]);
  }

  dispatchedOrder(pedido: Orders) {
    console.log(pedido);
    this.pedido = pedido;
    this.pedido.estadoDelPedido = 2;
    this.pedidoService.updatePedidos(this.pedido);
  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy(): void {
    if (this.pedidosDomicilioSuscribe) {
      this.pedidosDomicilioSuscribe.unsubscribe();
    } 
    if (this.pedidosLocalSuscribe) {
      this.pedidosLocalSuscribe.unsubscribe();
    }
    if (this.repartidoresSuscribe) {
      this.repartidoresSuscribe.unsubscribe();
    }
    if (this.productosSubscribe) {
      this.productosSubscribe.unsubscribe();
    }
  }

  notifyOrder(repartidor: Deliveryman) {
    console.log(repartidor);
    const telefono = '593' + repartidor.telefono;
    const url_prueba = 'http://localhost:4200/login';
    const cuerpo_mensaje =
      'Hola ' + repartidor.nombre + ' ' + repartidor.apellido + ' ' +
      'Tienes un nuevo pedido por entregar: ' +
      '*' + this.pedido.idPedido + '*' +
      'Ingresa a este enlace para finalizar el pedido cuando lo hayas entregado: ' +
      url_prueba;





    window.open('https://api.whatsapp.com/send?phone=' + telefono + '&text=' + cuerpo_mensaje);

  }
}

