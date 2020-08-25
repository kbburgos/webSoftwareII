import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { DeliverymanService  } from 'app/core/services/deliverman/deliveryman.service';
import { UsersService  } from 'app/core/services/user/users.service';
import { AuthService } from 'app/core/services/auth/auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SeguridadService } from 'app/core/services/seguridad.service';
import {OrdersScroller} from 'app/core/interface/ordersScroller';
import { PedidoService } from 'app/core/services/pedido/pedido.service';
import {LazyLoadEvent, SelectItem} from 'primeng/api';
import { ProductoService } from 'app/core/services/product/producto.service';
import { Producto } from 'app/core/models/producto';
import { Orders } from 'app/core/interface/orders';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { OrdersDispatched } from 'app/core/interface/ordersDispatched';
import { CategoriaService } from 'app/core/services/categoria/categoria.service';
import { Categoria } from 'app/core/interface/categoria';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {
  pedidosEntrantes: OrdersScroller[];
  pedidosEntrantesApi: OrdersDispatched[];
  token: any = this.auth.getJwtToken();
  numeroVentas: number[] = [];
  mapa: Map<string, number>;
  numeroPedidosLocal = 0;
  numeroPedidosDomicilio = 0;
  ventasTotales: number;
  mapaProductos: {} = {};
  listaProductosDeApi = [];
  listaCantidadesDeApi = [];
  sortOptions: SelectItem[];
  sortOptionsProducts: SelectItem[];
  productos: Producto[] = [];
  sortKey: string;
  sortkeyProduct: string;
  cantidadTotalProductosxPedido: number;
  cantidadPedidos: number;
  display = false;
  displayProducto = false;
  cols = [];
  listaProductos: Array<any> = [];
  productoTmp = 0;
  infoProducto: Producto;
  descripcionProducto = '';
  costoProducto = 0;
  categoriaProducto = '';
  imagenProducto = '';
  listaCategorias: Categoria[];
  private nombreRepartidoresSubscribe;
  private nombreClientesSubscribe;
  private pedidosSubscribe;
  private productosSubscribe;
  private pedidosApi;
  private categoriasSubscribe;
  constructor(private userService: UsersService,
    private novedadesRepartidor: DeliverymanService,
    private clientes: UsersService,
    private productService: ProductoService,
    private spinner: NgxSpinnerService,
    private caterogiasService: CategoriaService,
    private auth: AuthService,
    private seguridad: SeguridadService,
    private messageService: MessageService,
    private pedidoService: PedidoService ) { }

  ngOnInit() {
    this.nombreRepartidoresSubscribe = this.novedadesRepartidor.getRepartidores()
    .subscribe((item: any) => {
      environment.variables.nombreRepartidores = item;
    });

    this.nombreClientesSubscribe = this.clientes.usuarios()
    .subscribe((item: any) => {
      environment.variables.nombreClientes = item;
    });
    this.categoriasSubscribe = this.caterogiasService.getCategorias().subscribe( (item: any) =>{
      this.listaCategorias = item;
    });

    this.mapa = new Map();
    this.spinner.show();
    this.sortOptions = [
      {label: 'Mayor valor', value: '!total'},
      {label: 'Menor Valor', value: 'total'},
    ];
    this.sortOptionsProducts = [
      {label: 'Mayor stock', value: '!total'},
      {label: 'Menor stock', value: 'total'},
    ];
    this.pedidosSubscribe = this.pedidoService.getPedidosByEstado(0).subscribe( (item: any) => {
      this.pedidosEntrantes = item;
      this.cantidadPedidos = this.pedidosEntrantes.length;
    }, error => {
      this.spinner.hide();
      this.errorMessage('No se pudo cargar los pedidos');
    });

    this.productosSubscribe = this.productService.getProductos().subscribe((item: any ) => {
      this.productos = item;
      this.infoProducto = this.productos[0];
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.errorMessage('No se pudo cargar los productos de los pedidos');
    });
    this.pedidosApi = this.pedidoService.getPedidosDispatchedFromApi().subscribe( (item: any) => {
      this.pedidosEntrantesApi = item;
      for ( let i = 0 ; i < this.pedidosEntrantesApi.length; i++) {
        this.numeroVentas.push(this.pedidosEntrantesApi[i].subtotal);
        if (this.pedidosEntrantesApi[i].compra['entregaDomocilio']) {
          this.numeroPedidosDomicilio += 1;
        } else {
          this.numeroPedidosLocal += 1;
        }
        this.listaProductosDeApi = this.pedidosEntrantesApi[i].idproducto.split(',');
        this.listaCantidadesDeApi = this.pedidosEntrantesApi[i].cantidad.toString().split(',');
        for ( let j = 0; j < this.listaProductosDeApi.length; j++) {
          if (this.mapa.get(this.listaProductosDeApi[j]) == null) {
            // tslint:disable-next-line: radix
            this.mapa.set(this.listaProductosDeApi[j], parseInt(this.listaCantidadesDeApi[j]));
          } else {
            // tslint:disable-next-line: radix
            this.productoTmp = this.mapa.get(this.listaProductosDeApi[j]) + parseInt(this.listaCantidadesDeApi[j]);
            this.mapa.set(this.listaProductosDeApi[j], this.productoTmp);
          }
        }
      }
      console.log(this.mapa);
      this.ventasTotales = this.numeroVentas.reduce((a, b) => a + b , 0);
    }, error => {
      this.errorMessage('No se pudo cargar las ventas');
    });
    /*
    const source = this.pedidoService.getPedidosApl().addEventListener('message', message => {
      console.log('dentro de source');
      console.log(message.data);
    });*/





  }
  onSortChangeProducts() {
    console.log(this.sortkeyProduct);
    if (this.sortkeyProduct.indexOf('!') === 0) {
      this.sortProducts(-1);
    } else if (this.sortkeyProduct.indexOf('!') === -1) {
      this.sortProducts(1);
    }
  }

  sortProducts(product: number): void {
    const productos = [...this.productos];
    productos.sort((data1, data2) => {
      const value1 = data1.stock;
      const value2 = data2.stock;
      const result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (product * result);
    });

    this.productos = productos;
  }

  onSortChange() {
    console.log(this.sortKey);
    if (this.sortKey.indexOf('!') === 0) {
      this.sort(-1);
    } else if (this.sortKey.indexOf('!') === -1) {
      this.sort(1);
    }
  }

  sort(order: number): void {
    const pedidos = [...this.pedidosEntrantes];
    pedidos.sort((data1, data2) => {
      const value1 = data1.total;
      const value2 = data2.total;
      const result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (order * result);
    });

    this.pedidosEntrantes = pedidos;
  }

  selectPedido(pedido: Orders) {
    this.display = true;
    this.listaProductos = [];
    let  productofinal = {};
    for (let i = 0 ; i < pedido.productos.length; i++) {
      for (let j = 0 ; j < this.productos.length; j++) {
        if ( pedido.productos[i] === this.productos[j].idProducto ) {
          productofinal = {
            'producto' : this.productos[j].nombre,
            'cantidad' :  pedido.cantidades[i]
          }
          this.listaProductos.push(productofinal);
        }
      }
    }
    this.cantidadTotalProductosxPedido = pedido.cantidades.reduce( (a, b) => a + b , 0);
  }

  selectProducto(producto: Producto) {
    this.infoProducto = producto;
    this.displayProducto = true;
    for (let i = 0 ; i< this.listaCategorias.length; i++) {
      if (this.infoProducto.idCategoria === this.listaCategorias[i].idCategoria) {
        this.categoriaProducto = this.listaCategorias[i].nombre;
      }
    }
    this.imagenProducto = this.infoProducto.foto;
    this.descripcionProducto = this.infoProducto.descripcion;
    this.costoProducto = this.infoProducto.precio;


  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    if (this.productosSubscribe) {
      this.productosSubscribe.unsubscribe();
    }
    if (this.nombreRepartidoresSubscribe) {
      this.nombreRepartidoresSubscribe.unsubscribe();
    }
    if (this.pedidosSubscribe) {
      this.pedidosSubscribe.unsubscribe();
    }
    if (this.nombreClientesSubscribe) {
      this.nombreClientesSubscribe.unsubscribe();
    }
    if (this.pedidosApi) {
      this.pedidosApi.unsubscribe();
    }
  }
  errorMessage(mensaje: string) {
    this.messageService.add(
      {severity: 'error', summary: 'Error!',
      detail: mensaje, life: 5000 });
  }
}
