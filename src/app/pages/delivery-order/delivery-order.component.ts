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

/**
 * @classdesc Container class of DeliveryOrderComponent.
 * @desc Creation Date: 08/07/2020
 * @class
 * @public
 * @version 2.0.0
 * @author Danny Rios <dprios@espol.edu.ec>
 */
export class DeliveryOrderComponent implements OnInit {
  displayProducts = false;
  pedidoCambiaEstado: Orders;
  noveltys: deliverymanNoveltys[];
  selectednovelty: deliverymanNoveltys;
  repartidor: Deliveryman;
  cedulaRepartidor: string;
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
  refreshToken: any;
  cantidadCompras = 0;
  cols: any = [
    { field: 'cedula_cliente', header: 'CEDULA_CLIENTE' },
    { field: 'cliente', header: 'CLIENTE' },
    { field: 'pedido', header: 'PEDIDO' },
    { field: 'productos', header: 'PRODUCTOS' },
  ];

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
  private deleteOrder;
  private logOutSession;
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

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for loading the functions in the system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  ngOnInit() {
    this.spinner.show();
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
    }, error => {
      this.errorMessage('No se pudo cargar los pedidos');
    });
    this.productosSubscribe = this.productService.getProductos().subscribe((item: any ) => {
      this.productos = item;
    }, error => {
      this.errorMessage('No se pudo cargar los productos de los pedidos');
    });
    this.generarToken();
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for unsubscribe methods in the system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
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
    if (this.deleteOrder) {
      this.deleteOrder.unsubscribe();
    }
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for creating a token for deliveryman in the system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  generarToken() {
    this.loginApi = this.authDeliveryman.loginToApi(environment.emailRepartidor, environment.passwRReartidor).subscribe( (item: any) => {
      this.token = item.token;
      this.refreshToken = item.refreshToken;
    }, ( err ) => {
      this.spinner.hide();
      this.errorMessage('No se pudo acceder al api');
    });
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for loading purchase in the system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  cargarCompras() {
    this.verCompraApi = this.purchase.getPurchaseRepartidor(this.token).subscribe( (item: any) => {
      this.cantidadCompras = item.length;
      this.spinner.hide();
    }, ( err ) => {
      this.spinner.hide();
      this.errorMessage('No se pudo acceder a las compras');
    });
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for finalizing the purchase process in the system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  finalOrder(pedidoCulminado) {
    this.spinner.show();
    this.pedidoidDelRepartidor = pedidoCulminado.idPedido;
    this.pedidoDelRepartidor = pedidoCulminado;
    this.display = true;
    this.obtenerpedido = this.orderService.getPedidosByPedidoId(this.pedidoidDelRepartidor).subscribe(data => {
      this.pedidoCambiaEstado = data[0];
    },
    (err) => {
      this.spinner.hide();
      this.errorMessage('No se pudo cargar los pedidos');
    });
    this.cargarCompras();
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for loading the products information in the system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
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


  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for presenting a confirmation message in the system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  confirm() {
    this.confirmationService.confirm({
        message: '¿Deseas finalizar el pedido?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-circle',
        accept: () => {
          this.crearCompra();
          this.sendFinallyOrder(this.pedidoCambiaEstado);
        }
    });

  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for presenting a welcome message to the user in the system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  helloDialog( repartidor: Deliveryman) {
    this.messageService.add(
      {severity: 'info', summary: 'BIENVENIDO',
      detail: repartidor.nombre + ' ' + repartidor.apellido , life: 1500 });


  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for creating a purchase in the database. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  crearCompra() {
    const compraNueva = {
      idcompra: null,
      idusuario: this.pedidoCambiaEstado.idUsuario,
      entregaDomocilio: this.pedidoCambiaEstado.isDomicilio,
    }
    this.crearCompraApi = this.purchase.createPurchaseRepartidor(this.token, compraNueva).subscribe((item: any) => {
      this.confirmationAction('compra');
      this.cargarCompras();
    }, (err) => {
      this.errorMessage('No se pudo realizar la compra');
    });
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for creating an order in the database and novelty in firebase. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  sendFinallyOrder(pedido) {
    this.horaRetiro = new Date(this.horaRetiro);
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
        this.errorMessage('No se pudo realizar enviar la novedad');
      });
    }
    for (let i = 0 ; i < this.dato.length; i++) {
      if (this.dato[i].idPedido === pedido.idPedido) {
        this.dato.splice(i, 1);
      }
    }
    this.updateRpartidor = this.deliveryManService.updateDeliveryMan(this.repartidor);
    let productoApi = '';
    let cantidadApi = '';
    for (let i = 0 ; i < pedido.productos.length; i++) {
      productoApi = productoApi + pedido.productos[i] + ',';
      cantidadApi += pedido.cantidades[i] + ',';
    }
    cantidadApi = cantidadApi.substring(0, cantidadApi.length - 1);
    productoApi = productoApi.substring(0, productoApi.length - 1);
    const idCompraApi = this.cantidadCompras + 1 ;

    // this.cantidadTotalProductosxPedido = pedido.cantidades.reduce( (a, b) => a + b , 0);
    const pedidoNuevo = {
      idpedido: null,
      idcompra: idCompraApi,
      idproducto: productoApi,
      cantidad: cantidadApi,
      subtotal: pedido.total,
      cubiertos: pedido.cubiertos,
      estado: '3',
    }
    this.crearPedidoApi = this.orderService.setPedidosToDispatchedByRepartidor(this.token, pedidoNuevo).subscribe( item => {
      this.confirmationAction('pedido');
    },
    error => {
      this.errorMessage('No se pudo realizar el pedido');
    });
    this.display = false;
    this.deleteOrder = this.orderService.deletePedido(pedido.idPedido);
    this.generarToken();
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for deleting deliveryman id in the storage system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  logOut() {
    this.authDeliveryman.removeTokens();
    this.router.navigate(['deliveryman']);
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for presenting a confirmation action to purchase and confirmation order message in the system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  confirmationAction( data: string) {
    let mensaje = '';
    if (data === 'compra') {
      mensaje = 'La compra finalizó con éxito';
    } else if (data === 'pedido') {
      mensaje = 'El pedido finalizó con éxito';
      const rejectToken = {
        refreshToken: this.refreshToken
      };
      this.logOutSession = this.authDeliveryman.rejectTokenFromApi(rejectToken).subscribe( (item: any) => {
        this.confirmationLogOut('Acción completada');
      }, error => {
        this.errorMessage('No se pudo finalizar la acción');
      });
    }
    this.messageService.add(
      {severity: 'success', summary: 'CONFIRMACIÓN',
      detail: mensaje, life: 1500 });
  }


  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for presenting a error message in the system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  errorMessage(mensaje: string) {
    this.messageService.add(
      {severity: 'error', summary: 'Error!',
      detail: mensaje, life: 2000 });
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for presenting a confirmation logout message in the system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  confirmationLogOut( data: string) {
    this.messageService.add(
      {severity: 'success', summary: 'CONFIRMACIÓN',
      detail: data, life: 1500 });
  }
}
