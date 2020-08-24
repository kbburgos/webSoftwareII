import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'app/core/services/pedido/pedido.service';
import { AuthService } from 'app/core/services/auth/auth.service';
import { ProductoService } from 'app/core/services/product/producto.service';
import { Producto } from 'app/core/models/producto';
import { OrdersDispatched } from 'app/core/interface/ordersDispatched';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
@Component({
  selector: 'app-dispatched',
  templateUrl: './dispatched.component.html',
  styleUrls: ['./dispatched.component.css'],
  providers: [MessageService]
})
export class DispatchedComponent implements OnInit {
  token = this.auhtService.getJwtToken();
  pedidosDeApi: OrdersDispatched[] = [];
  listaProductos: Array<any> = [];
  productos: Producto[];
  displayDetail = false;
  cantidadTotalProductosxPedido: number;
  private pedidosDespachados;
  private productosSubscribe;

  cols: any = [
    { field: "pedido", header: "PEDIDO" },
    { field: "productos", header: "PRODUCTOS" },
  ];

  constructor(private pedidosService: PedidoService,
    private auhtService: AuthService,
    private productService: ProductoService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService
    ) {}

  ngOnInit() {
    this.spinner.show();
    this.pedidosDespachados = this.pedidosService.getPedidosDispatchedFromApi(this.token).subscribe( (item: any) => {
      this.pedidosDeApi = item;
    }, error =>{
      this.showMessage('No se pudo cargar los pedidos');
    });
    this.productosSubscribe = this.productService.getProductos().subscribe((item: any ) => {
      this.productos = item;
      this.spinner.hide();
    }, error =>{
      this.showMessage('No se pudo cargar los productos de los pedidos');
    });
  }

  detailsProducts(productos: string, cantidades) {
    const productosSeleccionados = productos.split(',');
    this.displayDetail = true;
    this.listaProductos = [];
    const cantidadxProducto = cantidades.split(',');
    let  productofinal = {};
    for (let i = 0 ; i < productosSeleccionados.length; i++) {
      for (let j = 0 ; j < this.productos.length; j++) {
        if ( productosSeleccionados[i] === this.productos[j].idProducto ) {
          productofinal = {
            'producto' : this.productos[j].nombre,
            'cantidad' :  cantidadxProducto[i]
          }
          this.listaProductos.push(productofinal);
        }
      }
    }
    // tslint:disable-next-line: radix
    this.cantidadTotalProductosxPedido = cantidadxProducto.reduce( (a, b) => parseInt(a) + parseInt(b) , 0);
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    if (this.productosSubscribe) {
      this.productosSubscribe.unsubscribe();
    }
    if (this.pedidosDespachados) {
      this.pedidosDespachados.unsubscribe();
    }
  }

  showMessage(mensaje: string) {
    this.messageService.add(
      {severity: 'error', summary: 'Error!',
      detail: mensaje, life: 2000 });
  }


}

