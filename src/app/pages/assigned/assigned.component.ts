import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'app/core/services/pedido/pedido.service';
import { DeliverymanService } from 'app/core/services/deliverman/deliveryman.service';
import { Orders } from 'app/core/interface/orders';
import { AuthService } from 'app/core/services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import { Deliveryman } from 'app/core/interface/deliveryman';
import { Producto } from 'app/core/models/producto';
import { ProductoService } from 'app/core/services/product/producto.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-assigned',
  templateUrl: './assigned.component.html',
  styleUrls: ['./assigned.component.css'],
  providers: [MessageService],
})

/**
 * @classdesc Container class of AssignedComponent.
 * @desc Creation Date: 08/07/2020
 * @class
 * @public
 * @version 2.0.0
 * @author Danny Rios <dprios@espol.edu.ec>
 */
export class AssignedComponent implements OnInit {
  nombreRepartidor: string;
  apellidoRepartidor: string;
  telefonoRepartidor: string;
  cedulaRepartidor: string;
  displayDetail = false;
  displayDeliveryman = false;
  pedido: Orders;
  pedidosDomicilioAsignados: Orders[] = [];
  productos: Producto[];
  listaProductos: Array<any> = [];
  listaRepartidores: Deliveryman[];
  cantidadTotalProductosxPedido: number;
  repartidorxPedido: Deliveryman;
  private pedidosAsignadosSubscribe;
  private repartidoresSubscribe;
  private productosSubscribe;

  cols: any = [
    { field: 'pedido', header: 'PEDIDO' },
    { field: 'cliente', header: 'CLIENTE' },
    { field: 'productos', header: 'PRODUCTOS' },
  ];

  constructor(
    private pedidoService: PedidoService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private deliveryManService: DeliverymanService,
    private productService: ProductoService,
    private confirmationService: ConfirmationService,
    private authService: AuthService
  ) {}


  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for loading the functions in the system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
   */
  ngOnInit(): void {
    this.spinner.show();
    this.pedidosAsignadosSubscribe = this.pedidoService.getPedidosByEstado(1).subscribe((item: any) => {
      this.pedidosDomicilioAsignados = item;
      this.spinner.hide();
    }, error => {
      this.showAlert('No se pudo cargar los pedidos');
    });
    this.productosSubscribe = this.productService
      .getProductos()
      .subscribe((item: any) => {
        this.productos = item;
    }, error => {
      this.showAlert('No se pudo cargar los productos de los pedidos');
    });
    this.repartidoresSubscribe = this.deliveryManService
      .getRepartidores()
      .subscribe((item: any) => {
        this.listaRepartidores = item;
    }, error => {
      this.showAlert('No se pudo cargar el detalle de los repartidores');
    });
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for showing information about deliveryman of an order in the system. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
  */
  viewMoreInformationDelivery(pedidosAsignados: Orders) {
    this.displayDeliveryman = true;
    for (let i = 0; i < this.listaRepartidores.length; i++) {
      for (let j = 0; j < this.listaRepartidores[i].pedidos.length; j++) {
        if (
          pedidosAsignados.idPedido ===
          this.listaRepartidores[i].pedidos[j]['idPedido']
        ) {
          this.repartidorxPedido = this.listaRepartidores[i];
        }
      }
    }
    this.nombreRepartidor = this.repartidorxPedido.nombre;
    this.apellidoRepartidor = this.repartidorxPedido.apellido;
    this.cedulaRepartidor = this.repartidorxPedido.cedula;
    this.telefonoRepartidor = this.repartidorxPedido.telefono;
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
    this.displayDetail = true;
    this.listaProductos = [];
    let productofinal = {};
    for (let i = 0; i < productos.length; i++) {
      for (let j = 0; j < this.productos.length; j++) {
        if (productos[i] === this.productos[j].idProducto) {
          productofinal = {
            producto: this.productos[j].nombre,
            cantidad: cantidades[i],
          };
          this.listaProductos.push(productofinal);
        }
      }
    }
    this.cantidadTotalProductosxPedido = cantidades.reduce((a, b) => a + b, 0);
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for changing the status order in firebase. <br> Creation Date: 08/14/2020
   * @type {Promise<void>} Void type promise.
   * @author Danny Rios <dprios@espol.edu.ec>
  */
  sendOrder(pedidosAsignados) {
    this.confirmationService.confirm({
      header: 'Confirmación de pedido en camino',
      message: '¿Deseas cambiar el estado del pedido?',
      accept: () => {
        this.pedido = pedidosAsignados;
        this.pedido.estadoDelPedido = 2;
        this.pedidoService.updatePedidos(this.pedido);
        this.showSuccess('El pedido se está enviando');
      },
    });
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
  showSuccess(mensaje: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Enviando!',
      detail: mensaje,
      life: 2000,
    });
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
  showAlert(mensaje: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error!',
      detail: mensaje,
      life: 2000,
    });
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
