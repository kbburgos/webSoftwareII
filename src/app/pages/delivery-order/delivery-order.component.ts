import { Component, OnInit } from '@angular/core';
import { DeliverymanService } from 'app/services/deliveryman.service';
import { Deliveryman } from 'app/resource/interface/deliveryman';
import { ConfirmationService } from 'primeng/api';
import { DelivermanReporterService } from 'app/services/deliverman-reporter.service';
import { NovelyDeliverman } from 'app/resource/interface/noveltyDeliverman';
import { PedidoService } from 'app/services/pedido.service';
import { Orders } from 'app/resource/interface/orders';
import { MessageService } from 'primeng/api';
import { ProductoService } from 'app/services/producto.service';
import { Producto } from 'app/models/producto';
import { deliverymanNoveltys } from 'app/resource/interface/deliverymanNoveltys';
import { Router } from '@angular/router';
@Component({
  selector: 'app-delivery-order',
  templateUrl: './delivery-order.component.html',
  styleUrls: ['./delivery-order.component.css'],
  providers: [MessageService]
})
export class DeliveryOrderComponent implements OnInit {
  displayProducts = false;
  pedidoCambiaEstado: Orders;
  noveltys: deliverymanNoveltys[];
  selectednovelty: deliverymanNoveltys;
  repartidor: Deliveryman;
  cedulaRepartidor: string;
  cols: any[];
  display = false;
  listaPedidosRepartidor: Array<string> = [];
  pedidoid: string;
  pedido: any;
  dato: any;
  productos: Producto[];
  listaProductos: Array<any> = [];
  cantidadTotalProductosxPedido: number;
  ordenFinalizada: NovelyDeliverman;
  private actual = new Date();
  horaRetiro: any = new Date().setMinutes(this.actual.getMinutes() + 30);
  private deliveryman;
  private obtenerpedido;
  private productosSubscribe;
  private cambiarEstadoPedido;
  private enviarNovedad;
  private updateRpartidor;

  constructor(
    private deliveryManService: DeliverymanService,
    private confirmationService: ConfirmationService ,
    private noveltyDelivermanService: DelivermanReporterService,
    private orderService: PedidoService,
    private productService: ProductoService,
    private messageService: MessageService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.horaRetiro = new Date(this.horaRetiro);
    this.noveltys = [
      {name: 'Cliente molestoso', value : 'cliente molestoso'},
      {name: 'Cliente falta respeto', value : 'Cliente falta respeto'},
      {name: 'Cliente se queja del pedido', value : 'Cliente se queja del pedido'},
      {name: 'Otro', value : 'Cliente se queja del pedido'},
    ];
    this.cedulaRepartidor = this.deliveryManService.getdeliverIdStorage();
    this.deliveryman = this.deliveryManService.getDeliveryManByCedula(this.cedulaRepartidor).subscribe((data: any) => {
      this.repartidor = data[0];
      this.dato = data[0]['pedidos'];
      this.helloDialog(this.repartidor);
    });

    this.productosSubscribe = this.productService.getProductos().subscribe((item: any ) => {
      this.productos = item;
    });
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy () {
    if (this.deliveryman) {
      this.deliveryman.unsubscribe();
    }
    if (this.productosSubscribe) {
      this.productosSubscribe.unsubscribe();
    }
    if (this.obtenerpedido) {
      this.obtenerpedido.unsubscribe();
    }
    if (this.cambiarEstadoPedido) {
      this.cambiarEstadoPedido.unsubscribe();
    }
    if (this.enviarNovedad) {
      this.enviarNovedad.unsubscribe();
    }
    if (this.updateRpartidor) {
      this.updateRpartidor.unsubscribe();
    }
  }

  assinggnOrder(pedidoCulminado) {
    this.pedidoid = pedidoCulminado.idPedido;
    this.pedido = pedidoCulminado;
    this.display = true;
    this.obtenerpedido = this.orderService.getPedidosByPedidoId(this.pedidoid).subscribe(data => {
      this.pedidoCambiaEstado = data[0];
    },
    (err) => {
      alert('Hubo un problema al cargar los pedidos');
    });
  }

  /*showClient(idCliente: string) {
    //this.clientSubscribe =
  }*/

  detailsProducts (productos: [], cantidades: []) {
    this.displayProducts = true;
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


  confirm() {
    this.confirmationService.confirm({
        message: '¿Está seguro?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-circle',
        accept: () => {
          this.sendFinallyOrder(this.pedidoCambiaEstado);
        },
        reject: () => {

        }
    });

  }

  helloDialog( repartidor: Deliveryman) {
    this.messageService.add(
      {severity: 'info', summary: 'BIENVENIDO',
      detail: repartidor.nombre + ' ' + repartidor.apellido , life: 1500 });


  }

  sendFinallyOrder(pedido) {
    console.log(pedido);
    let novedadRepartidor = '';
    if (this.selectednovelty != null) {
      novedadRepartidor = this.selectednovelty.value
    } else {
      novedadRepartidor = '';
    }
    this.ordenFinalizada = {
      idPedido: pedido.idPedido,
      idRepartidor: this.cedulaRepartidor,
      novedad: novedadRepartidor,
      idCliente: pedido.idUsuario,
      fecha: this.horaRetiro
    };
    console.log(this.ordenFinalizada);
    this.pedidoCambiaEstado.estadoDelPedido = 2;
    this.cambiarEstadoPedido = this.orderService.updatePedidos(this.pedidoCambiaEstado);
    this.enviarNovedad = this.noveltyDelivermanService.pushPedidoFinal(this.ordenFinalizada).then((data: any) => {
      this.display = false;
    })
    .catch((err: any) => {
      alert('Hubo un problema al enviar el pedido finalizado');
    });

    for (let i = 0 ; i < this.dato.length; i++) {
      if (this.dato[i].idPedido === pedido.idPedido) {
        this.dato.splice(i, 1);
      }
    }

    this.updateRpartidor = this.deliveryManService.updateDeliveryMan(this.repartidor);
  }

  logOut(){
    this.deliveryManService.removeDeliveryStorage();
    this.router.navigate(['deliveryman']);

  }

}
