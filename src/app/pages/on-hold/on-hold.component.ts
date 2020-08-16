import { Component, OnInit} from '@angular/core';
import { OnHold } from 'app/core/interface/onhold';
import { PedidoService } from 'app/core/services/pedido/pedido.service';
import { Orders } from 'app/core/interface/orders';
import { Deliveryman } from 'app/core/interface/deliveryman';
import { DeliverymanService } from 'app/core/services/deliverman/deliveryman.service';
import { ProductoService } from 'app/core/services/product/producto.service';
import { Producto } from 'app/core/models/producto';
import { MessageService } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-on-hold',
  templateUrl: './on-hold.component.html',
  styleUrls: ['./on-hold.component.css'],
  providers: [MessageService]
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
  disabledButtonEraser = true;
  fechaActual = new Date();
  private pedidosDomicilioSuscribe;
  private pedidosLocalSuscribe;
  private repartidoresSuscribe;
  private productosSubscribe;
  private deleteOrder;

  constructor(
    private pedidoService: PedidoService,
    private deliveryManService: DeliverymanService,
    private productService: ProductoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

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
      for (let i  = 0; i < this.pedidosLocal.length; i++) {
        this.pedidosLocal[i].horaDeRetiro = (this.pedidosLocal[i].horaDeRetiro.toDate());
        if ( this.pedidosLocal[i].horaDeRetiro > this.fechaActual) {
          console.log('es mayor');
          this.disabledButtonEraser = true;
        }
      }
    });
    this.repartidoresSuscribe = this.deliveryManService.getRepartidores().subscribe((item: any) => {
      this.repartidores = item;
    });
    this.productosSubscribe = this.productService.getProductos().subscribe((item: any ) => {
      this.productos = item;
    });
  }

  detailsProducts(productos: [], cantidades: []) {
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
      if (a.pedidos.length < b.pedidos.length) {
        return -1;
      }
    });
    this.pedido = pedido;
    this.pedido.estadoDelPedido = 1;
    this.pedidoService.updatePedidos(this.pedido);
    this.listaPedidos = this.repartidores[0].pedidos;
    this.listaPedidos.push({'idPedido': pedido.idPedido, 'codigoCliente': pedido.idUsuario,
     'productos': pedido.productos, 'cantidades': pedido.cantidades});
    this.deliveryManService.updateDeliveryMan(this.repartidores[0]);
    // this.notifyOrder(this.repartidores[0]);
    this.showSuccess('repartidor');
  }

  changeState(pedido: Orders) {
    this.pedido = pedido;
    this.pedido.estadoDelPedido = 2;
    this.pedidoService.updatePedidos(this.pedido);
    this.showSuccess('local');
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
    const telefono2 = '593995248654';
    const url_prueba = 'http://localhost:4200/deliveryman';
    const enlaceMapa = 'https://www.google.com.ec/maps/@' + this.pedido.direccionEntrega['coordenadas'][0]
    + ',' + this.pedido.direccionEntrega['coordenadas'][1];
    const mapa = 'https://www.google.com.ec/maps/@-2.1008854,-79.9095824,18.08z';
    const cuerpo_mensaje =
      'Hola ' + repartidor.nombre + ' ' + repartidor.apellido + ' ' +
      ', tienes un nuevo pedido por entregar. El código del pedido es *' + this.pedido.idPedido +
      '*, la cédula del cliente: *' + this.pedido.idUsuario +
      '*, la dirección *' + this.pedido.direccionEntrega['direccion'] + ' ' + this.pedido.direccionEntrega['referencia'] +
      '*, puedes ver la dirección del cliente en el siguiente enlace ' + mapa +
      ' . Cuando entregues el pedido, ingresa a este enlace para finalizarlo: ' + url_prueba;
    window.open('https://api.whatsapp.com/send?phone=' + telefono2 + '&text=' + cuerpo_mensaje);

  }

  showSuccess(esRepartidor: string) {
    let detail: string;
    if (esRepartidor === 'repartidor') {
      detail = 'El pedido se asignó correctamente';
    } else if(esRepartidor === 'local'){
      detail = 'Se despachó el pedido correctamente';
    } else if (esRepartidor === 'eliminar') {
      detail = 'El pedido se eliminó correctamente';
    }
    this.messageService.add(
      {severity: 'success', summary: 'Mensaje de confirmación',
      detail: detail, life: 2000 });
  }

  confirm(pedido: Orders) {
    this.confirmationService.confirm({
        header: 'Enviar el pedido a Pedidos Despachados',
        message: '¿Estás seguro de realizar esta acción?',
        accept: () => {
          this.pedido = pedido;
          this.pedido.estadoDelPedido = 2;
          this.pedidoService.updatePedidos(this.pedido);
          this.showSuccess('local');
        }
    });
  }

  eraserOrder(pedido: Orders){
    this.confirmationService.confirm({
      header: 'Eliminar pedido',
      message: '¿Está seguro de eliminar el pedido?',
      accept: () => {
        this.erarserOrderSelectedd(pedido);
        this.showSuccess('eliminar');
      }
    });
  }

  erarserOrderSelectedd(pedido: Orders){
    /*for (let i = 0; i < this.pedidosLocal.length ; i++ ) {
      if (this.pedidosLocal[i].idPedido === pedido.idPedido) {
        this.pedidosLocal.splice(i, 1);
      }
    }
    console.log(this.pedidosLocal);*/
    this.deleteOrder = this.pedidoService.deletePedido(pedido.idPedido);
  }
}

