import { Component, OnInit } from "@angular/core";
import { PedidoService } from "app/core/services/pedido/pedido.service";
import { AuthService } from "app/core/services/auth/auth.service";
import { ProductoService } from "app/core/services/product/producto.service";
import { Producto } from "app/core/models/producto";
import { OrdersDispatched } from "app/core/interface/ordersDispatched";

@Component({
  selector: "app-dispatched",
  templateUrl: "./dispatched.component.html",
  styleUrls: ["./dispatched.component.css"],
})
export class DispatchedComponent implements OnInit {
  token= this.auhtService.getJwtToken();
  pedidosDeApi: OrdersDispatched[] = [];
  listaProductos: Array<any> = [];
  productos: Producto[];
  cols: any[];
  displayDetail = false;
  cantidadTotalProductosxPedido: number;
  private pedidosDespachados;
  private productosSubscribe;
  constructor(private pedidosService: PedidoService, 
    private auhtService: AuthService,
    private productService: ProductoService,
    ) {}

  ngOnInit() {
    this.pedidosDespachados = this.pedidosService.getPedidosDispatchedFromApi(this.token).subscribe( (item: any) =>{
      this.pedidosDeApi = item;

    });
    this.productosSubscribe = this.productService.getProductos().subscribe((item: any ) => {
      this.productos = item;
    });
  }

  detailsProducts(productos: string, cantidades) {
    let productosSeleccionados = productos.split(',');
    this.displayDetail = true;
    this.listaProductos = [];
    let  productofinal = {};
    for (let i = 0 ; i < productosSeleccionados.length; i++) {
      for (let j = 0 ; j < this.productos.length; j++) {
        if ( productosSeleccionados[i] === this.productos[j].idProducto ) {
          productofinal = {
            'producto' : this.productos[j].nombre,
            'cantidad' :  cantidades[i]
          }
          this.listaProductos.push(productofinal);
        }
      }
    }
    this.cantidadTotalProductosxPedido = cantidades;
  }

  ngOnDestroy() {
    if(this.productosSubscribe) {
      this.productosSubscribe.unsubscribe();
    }
    if(this.pedidosDespachados) {
      this.pedidosDespachados.unsubscribe();
    }
  }

}

