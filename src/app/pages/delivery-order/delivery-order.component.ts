import { Component, OnInit } from '@angular/core';
import { DeliverymanService } from 'app/core/services/deliverman/deliveryman.service';
import { Deliveryman } from 'app/core/interface/deliveryman';
import { ConfirmationService } from 'primeng/api';
import { DelivermanReporterService } from 'app/core/services/deliverman/deliverman-reporter.service';
import { NovelyDeliverman } from 'app/core/interface/noveltyDeliverman';
import { PedidoService } from 'app/core/services/pedido/pedido.service';
import { Orders } from 'app/core/interface/orders';
import { MessageService } from 'primeng/api';
import { ProductoService } from 'app/core/services/product/producto.service';
import { Producto } from 'app/core/models/producto';
import { deliverymanNoveltys } from 'app/core/interface/deliverymanNoveltys';
import { Router } from '@angular/router';
import { SeguridadService } from 'app/core/services/seguridad.service';
import { AuthDeliverymanService } from 'app/core/services/deliverman/auth-deliveryman.service';
import { environment } from 'environments/environment';
import { PurchaseService } from 'app/core/services/purchase/purchase.service';
import { NgxSpinnerService } from 'ngx-spinner';
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
  pedidoidDelRepartidor: string;
  pedidoDelRepartidor: any;
  dato: any;
  productos: Producto[];
  listaProductos: Array<any> = [];
  cantidadTotalProductosxPedido: number;
  ordenFinalizada: NovelyDeliverman;
  private actual = new Date();
  horaRetiro: any = new Date().setMinutes(this.actual.getMinutes());
  token: any;
  cantidadCompras : number = 0;
  private deliveryman;
  private obtenerpedido;
  private productosSubscribe;
  private cambiarEstadoPedido;
  private enviarNovedad;
  private loginApi;
  private updateRpartidor;
  private crearCompraApi;
  private verCompraApi;
  private crearPedidoApi;

  constructor(
    private deliveryManService: DeliverymanService,
    private authDeliveryman: AuthDeliverymanService,
    private confirmationService: ConfirmationService ,
    private noveltyDelivermanService: DelivermanReporterService,
    private orderService: PedidoService,
    private productService: ProductoService,
    private purchase: PurchaseService,
    private messageService: MessageService,
    private router: Router,
    private seguridad: SeguridadService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit() {
    this.spinner.show();
    this.horaRetiro = new Date(this.horaRetiro);
    this.noveltys = [
      {name: 'Cliente molestoso', value : 'cliente molestoso'},
      {name: 'Cliente falta respeto', value : 'Cliente falta respeto'},
      {name: 'Cliente se queja del pedido', value : 'Cliente se queja del pedido'},
    ];
    this.cedulaRepartidor = this.authDeliveryman.getdeliverIdStorage();
    this.deliveryman = this.deliveryManService.getDeliveryManByCedula(this.cedulaRepartidor).subscribe((data: any) => {
      this.repartidor = data[0];
      this.dato = data[0]['pedidos'];
      this.helloDialog(this.repartidor);
      this.spinner.hide();
    });
    this.productosSubscribe = this.productService.getProductos().subscribe((item: any ) => {
      this.productos = item;
    });
    this.loginApi = this.authDeliveryman.loginToApi(environment.emailRepartidor,environment.passwRReartidor).subscribe( (item: any) => {
      this.token = item.token;
    }, ( err ) => {
      console.log(err);
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
    if (this.loginApi) {
      this.loginApi.unsubscribe();
    }
    if (this.crearCompraApi) {
      this.crearCompraApi.unsubscribe();
    }
    if (this.crearPedidoApi) {
      this.crearPedidoApi.unsubscribe();
    }
    if (this.verCompraApi) {
      this.verCompraApi.unsubscribe();
    }
  }

  finalOrder(pedidoCulminado) {
    this.pedidoidDelRepartidor = pedidoCulminado.idPedido;
    this.pedidoDelRepartidor = pedidoCulminado;
    this.display = true;
    this.obtenerpedido = this.orderService.getPedidosByPedidoId(this.pedidoidDelRepartidor).subscribe(data => {
      this.pedidoCambiaEstado = data[0];
    },
    (err) => {
      alert('Hubo un problema al cargar los pedidos');
    });
    this.spinner.show();
    this.verCompraApi = this.purchase.getPurchase(this.token).subscribe( (item: any) =>{
      this.cantidadCompras = item.length;
      //console.log("cantidad de compra generada en ngoninit: ", this.cantidadCompras);
      this.spinner.hide();
    });
  }

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
    let novedadRepartidor = '';
    if (this.selectednovelty != null) {
      novedadRepartidor = this.selectednovelty.value
      this.ordenFinalizada = {
        idPedido: pedido.idPedido,
        idRepartidor: this.cedulaRepartidor,
        novedad: novedadRepartidor,
        idCliente: pedido.idUsuario,
        fecha: this.horaRetiro
      };
      this.enviarNovedad = this.noveltyDelivermanService.pushPedidoFinal(this.ordenFinalizada).then((data: any) => {
        this.display = false;
      })
      .catch((err: any) => {
        alert('Hubo un problema al finalizar el pedido ');
      });
    }
    pedido.estadoDelPedido = 3;
    this.cambiarEstadoPedido = this.orderService.updatePedidos(pedido);
    for (let i = 0 ; i < this.dato.length; i++) {
      if (this.dato[i].idPedido === pedido.idPedido) {
        this.dato.splice(i, 1);
      }
    }
    this.updateRpartidor = this.deliveryManService.updateDeliveryMan(this.repartidor);
    let productoApi: string = '';
    for (let i = 0 ; i < pedido.productos.length; i++) {
      productoApi = productoApi + pedido.productos[i] + ',';
    }
    productoApi = productoApi.substring(0, productoApi.length - 1);
    const idCompraApi = this.cantidadCompras + 1 ;
    const compraNueva = {
      idcompra: null,
      idusuario: pedido.idUsuario,
      entregaDomocilio: pedido.isDomicilio,
    }
    this.crearCompraApi = this.purchase.createPurchase(this.token,compraNueva).subscribe((item: any) =>{
      this.confirmationAction('compra');
    }, (err)=>{
      this.errorAction('compra');
    });
    this.cantidadTotalProductosxPedido = pedido.cantidades.reduce( (a, b) => a + b , 0);
    const pedidoNuevo = {
      idpedido: null,
      idcompra: idCompraApi,
      idproducto: productoApi,
      cantidad: this.cantidadTotalProductosxPedido,
      subtotal: pedido.total,
      cubiertos: pedido.cubiertos,
      estado: '3',
    }
    this.crearPedidoApi = this.orderService.setPedidosToDispatched(this.token, pedidoNuevo).subscribe( item => {
      this.confirmationAction('pedido');
    },
    error => {
      this.errorAction('pedido');
      console.log(error);
    });
    this.display = false;
  }

  logOut(){
    this.authDeliveryman.removeTokens();
    this.router.navigate(['deliveryman']);

  }
  confirmationAction( data: string) {
    let mensaje = '';
    if(data === 'compra') {
      mensaje = 'La compra finalizó con éxito';
    } else if (data === 'pedido') {
      mensaje = 'El pedido finalizó con éxito';
    }
    this.messageService.add(
      {severity: 'success', summary: 'CONFIRMACIÓN',
      detail: mensaje, life: 1500 });
  }
  errorAction(data : string) {
    let mensaje = '';
    if(data === 'compra') {
      mensaje = 'La compra no se pudo realizar';
    } else if (data === 'pedido') {
      mensaje = 'El pedido no se pudo realizar';
    }
    this.messageService.add(
      {severity: 'danger', summary: 'ERROR',
      detail: mensaje, life: 1500 });
  }

}
