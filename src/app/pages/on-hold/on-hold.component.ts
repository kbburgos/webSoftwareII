import { Component, OnInit} from '@angular/core';
import { OnHold } from 'app/core/interface/onhold';
import { PedidoService } from 'app/core/services/pedido/pedido.service';
import { Orders } from 'app/core/interface/orders';
import { Deliveryman } from 'app/core/interface/deliveryman';
import { DeliverymanService } from 'app/core/services/deliverman/deliveryman.service';
import { ProductoService } from 'app/core/services/product/producto.service';
import { Producto } from 'app/core/models/producto';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'app/core/services/auth/auth.service';
import { UsersService } from 'app/core/services/user/users.service';
import { Usuarios } from 'app/core/models/usuarios';
import { SeguridadService } from 'app/core/services/seguridad.service';
import { PurchaseService } from 'app/core/services/purchase/purchase.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-on-hold',
  templateUrl: './on-hold.component.html',
  styleUrls: ['./on-hold.component.css'],
  providers: [MessageService]
})

/**
 * @classdesc Container class of OnHoldComponent.
 * @desc Creation Date: 08/07/2020
 * @class
 * @public
 * @version 2.0.0
 * @author Danny Rios <dprios@espol.edu.ec>
 */
export class OnHoldComponent implements OnInit {
  loading = true;
  display = false;
  productos: Producto[];
  listaClientes: Usuarios[];
  listaProductos: Array<any> = [];
  repartidores: Deliveryman[];
  prueba: Deliveryman[];
  repartidor: Deliveryman;
  pedidosDomicilio: Orders[];
  token: any = this.auth.getJwtToken();
  pedidosLocal: Orders[];
  pedido: Orders;
  selectedOnHold: OnHold;
  listonhold: OnHold[];
  selectedValue: string;
  idPedido;
  listaPedidos;
  cantidadTotalProductosxPedido: number;
  disabledButtonEraser = true;
  fechaActual = new Date();
  permiso;
  cantidadCompras = 0;
  cols: any = [
    { field: 'pedido', header: 'PEDIDO' },
    { field: 'cliente', header: 'CLIENTE' },
    { field: 'productos', header: 'PRODUCTOS' },
  ];

  private pedidosDomicilioSuscribe;
  private pedidosLocalSuscribe;
  private repartidoresSuscribe;
  private productosSubscribe;
  private clientexIdSubscribe;
  private deleteOrder;
  private crearCompraApi;
  private verCompraApi;
  private crearPedidoApi;

  constructor(
    private pedidoService: PedidoService,
    private deliveryManService: DeliverymanService,
    private productService: ProductoService,
    private messageService: MessageService,
    private auth: AuthService,
    private userService: UsersService,
    private purchase: PurchaseService,
    private seguridadService: SeguridadService,
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService) {
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
    this.permiso = this.seguridadService.encriptar(this.token);
    this.spinner.show();
    this.pedidosDomicilio = [];
    this.pedidosLocal = [];
    this.repartidores = [];
    this.listaPedidos = [];
    this.pedidosDomicilioSuscribe = this.pedidoService.getPedidosByEstadoByTipo(0 , true).subscribe((item: any) => {
      this.pedidosDomicilio = item;
    }, error => {
      this.spinner.hide();
      this.errorMessage('No se pudo cargar los pedidos a domicilio');
    });
    this.pedidosLocalSuscribe = this.pedidoService.getPedidosByEstadoByTipo(0 , false).subscribe((item: any) => {
      this.pedidosLocal = item;
      for (let i  = 0; i < this.pedidosLocal.length; i++) {
        this.pedidosLocal[i].horaDeRetiro = (this.pedidosLocal[i].horaDeRetiro.toDate());
        if ( this.pedidosLocal[i].horaDeRetiro < this.fechaActual) {
          this.disabledButtonEraser = false;
        } else if ( this.pedidosLocal[i].horaDeRetiro > this.fechaActual) {
          this.disabledButtonEraser = true;
        }
      }
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.errorMessage('No se pudo cargar los pedidos en local');
    });
    this.repartidoresSuscribe = this.deliveryManService.getRepartidores().subscribe((item: any) => {
      this.repartidores = item;
    }, error => {
      this.spinner.hide();
      this.errorMessage('No se pudo cargar los repartidores');
    });
    this.productosSubscribe = this.productService.getProductos().subscribe((item: any ) => {
      this.productos = item;
    }, error => {
      this.spinner.hide();
      this.errorMessage('No se pudo cargar los productos de los pedidos');
    });
    this.clientexIdSubscribe = this.userService.usuarios().subscribe((item: any) => {
      this.listaClientes = item;
    }, error => {
      this.spinner.hide();
      this.errorMessage('No se pudo cargar los clientes');
    });
    this.cargarCompras();
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for loading the purchases in the system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  cargarCompras() {
    this.spinner.show();
    this.verCompraApi = this.purchase.getPurchase().subscribe( (item: any) => {
      this.cantidadCompras = item.length;
      this.spinner.hide();
      console.log('comrpas dentro del metodo: ', this.cantidadCompras);
    }, error => {
      this.spinner.hide();
      this.errorMessage('No se pudo cargar las compras');
    });
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for showing information about products of an order in the system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
  */
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

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for assigning an order to deliveryman. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
  */
  assinggnOrder(pedido: Orders) {
    let cliente: Usuarios;
    for (let i = 0; i < this.listaClientes.length; i++) {
      if (this.listaClientes[i].cedula === pedido.idUsuario) {
        cliente = this.listaClientes[i];
      }
    }
    this.repartidores.sort(function(a, b) {
      if (a.pedidos.length < b.pedidos.length) {
        return -1;
      }
    });
    this.pedido = pedido;
    this.pedido.estadoDelPedido = 1;
    this.pedidoService.updatePedidos(this.pedido);
    this.listaPedidos = this.repartidores[0].pedidos;
    this.listaPedidos.push(
      {'idPedido': pedido.idPedido,
      'codigoCliente': cliente.cedula,
      'nombreCliente': cliente.nombre + ' ' + cliente.apellido,
      'productos': pedido.productos,
      'cantidades': pedido.cantidades
      }
    );
    this.deliveryManService.updateDeliveryMan(this.repartidores[0]);
    this.notifyOrder(this.repartidores[0], cliente );
    this.showSuccess('repartidor');
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for changing the status order. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
  */
  changeState(pedido: Orders) {
    this.pedido = pedido;
    this.spinner.show();
    console.log(this.pedido.cantidades);
    let productoApi = '';
    let cantidadApi = '';
    for (let i = 0 ; i < this.pedido.productos.length; i++) {
      productoApi +=  this.pedido.productos[i] + ',';
      cantidadApi += this.pedido.cantidades[i] + ',';
    }
    cantidadApi = cantidadApi.substring(0, cantidadApi.length - 1);
    productoApi = productoApi.substring(0, productoApi.length - 1);
    const compraNueva = {
      idcompra: null,
      idusuario: this.pedido.idUsuario,
      entregaDomocilio: this.pedido.isDomicilio,
    }
    this.crearCompraApi = this.purchase.createPurchase(compraNueva).subscribe( item => {
      this.spinner.hide();
      this.cargarCompras();
    },
    error => {
      this.errorMessage('No se pudo realizar la compra');
    });
    this.cantidadTotalProductosxPedido = this.pedido.cantidades.reduce( (a, b) => a + b , 0);
    const idCompraApi = this.cantidadCompras + 1 ;
    const pedidoNuevo = {
      idpedido: null,
      idcompra: idCompraApi,
      idproducto: productoApi,
      cantidad: cantidadApi,
      subtotal: this.pedido.total,
      cubiertos: this.pedido.cubiertos,
      estado: '3',
    }
    this.crearPedidoApi = this.pedidoService.setPedidosToDispatched( pedidoNuevo).subscribe( item => {
      this.showSuccess('local');
    },
    error => {
      this.errorMessage('No se pudo realizar el pedido');
    });
    this.showSuccess('local');
  }


  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for unsubscribing the methos in the system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
  */
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
    if (this.clientexIdSubscribe) {
      this.clientexIdSubscribe.unsubscribe();
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
   * @desc This method is responsible for notifying the deliveryman that you have an order. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
  */
  notifyOrder(repartidor: Deliveryman, cliente: Usuarios) {
    let json;
    let direccion;
    let coordenadas;
    const telefono = repartidor.telefono;
    const url_prueba = 'http://localhost:4200/deliveryman';
    if (this.pedido.direccionEntrega === 'S') {
      json = JSON.parse(JSON.stringify(cliente.direccion));
      direccion = JSON.parse(json);
      coordenadas = direccion.coordenadas.split(',');
    } else {
      json = JSON.parse(JSON.stringify(this.pedido.direccionEntrega));
      direccion = JSON.parse(json);
      coordenadas = direccion.ubicacion.split(',');
    }
    const mapa = 'https://www.google.com/maps/search/?api=1%26query=' + coordenadas[1] + ',' + coordenadas[0];
    const cuerpo_mensaje =
      'Hola ' + repartidor.nombre + ', el código del pedido es *' + this.pedido.idPedido +
      '*, el cliente es *' + cliente.nombre + ' ' + cliente.apellido +
      '*, la dirección es ' + direccion.direccion + ', su referencia es ' + direccion.referencia  +
      ', puedes  ubicarte con: ' + mapa +
      ' . Usa este enlace para finalizar el pedido ' + url_prueba ;
    window.open('https://api.whatsapp.com/send?phone=593' + telefono + '&text=' + cuerpo_mensaje);

  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for showing a confirm message dialog in the system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
  */
  showSuccess(esRepartidor: string) {
    let detail: string;
    if (esRepartidor === 'repartidor') {
      detail = 'El pedido se asignó correctamente';
    } else if (esRepartidor === 'local') {
      detail = 'Se despachó el pedido correctamente';
    } else if (esRepartidor === 'eliminar') {
      detail = 'El pedido se eliminó correctamente';
    }
    this.messageService.add(
      {severity: 'success', summary: 'Mensaje de confirmación',
      detail: detail, life: 2000 });
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for showing an error message dialog in the system. <br> Creation Date: 08/14/2020
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
   * @desc This method is responsible for showing a confirm create message dialog in the system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
  */
  createConfirmMessage(mensaje: string) {
      this.messageService.add(
        {severity: 'success', summary: 'Mensaje de confirmación',
        detail: mensaje, life: 2000 });
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for showing a confirm  message dialog in the system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
  */
  confirm(pedido: Orders) {
    this.confirmationService.confirm({
        header: 'Enviar el pedido a Pedidos Despachados',
        message: '¿Deseas realizar esta acción?',
        accept: () => {
          this.changeState(pedido);
          this.deleteOrder = this.pedidoService.deletePedido(this.pedido.idPedido);
        }
    });
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for deleting an order in firebase. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
  */
  eraserOrder(pedido: Orders) {
    this.confirmationService.confirm({
      header: 'Eliminar pedido',
      message: '¿Estás seguro que el pedido no fue retirado?',
      accept: () => {
        this.pedido = pedido;
        this.deleteOrder = this.pedidoService.deletePedido(pedido.idPedido);
        this.showSuccess('eliminar');
      }
    });
  }


}

