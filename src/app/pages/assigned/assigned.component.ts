import { Component, OnInit } from "@angular/core";
import { PedidoService } from "app/core/services/pedido/pedido.service";
import { DeliverymanService } from "app/core/services/deliverman/deliveryman.service";
import { Orders } from "app/core/interface/orders";
import { AuthService } from "app/core/services/auth/auth.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { Deliveryman } from "app/core/interface/deliveryman";
import { Producto } from "app/core/models/producto";
import { ProductoService } from "app/core/services/product/producto.service";
@Component({
  selector: "app-assigned",
  templateUrl: "./assigned.component.html",
  styleUrls: ["./assigned.component.css"],
  providers: [MessageService],
})
export class AssignedComponent implements OnInit {
  nombreRepartidor: string;
  apellidoRepartidor: string;
  telefonoRepartidor: string;
  cedulaRepartidor: string;
  displayDetail = false;
  displayDeliveryman = false;
  cols: any[];
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

  constructor(
    private pedidoService: PedidoService,
    private http: HttpClient,
    private messageService: MessageService,
    private deliveryManService: DeliverymanService,
    private productService: ProductoService,
    private confirmationService: ConfirmationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.pedidosAsignadosSubscribe = this.pedidoService
      .getPedidosByEstado(1)
      .subscribe((item: any) => {
        this.pedidosDomicilioAsignados = item;
      });

    this.productosSubscribe = this.productService
      .getProductos()
      .subscribe((item: any) => {
        this.productos = item;
      });
    this.repartidoresSubscribe = this.deliveryManService
      .getRepartidores()
      .subscribe((item: any) => {
        this.listaRepartidores = item;
      });
  }
  viewMoreInformationDelivery(pedidosAsignados: Orders) {
    this.displayDeliveryman = true;
    for (let i = 0; i < this.listaRepartidores.length; i++) {
      for (let j = 0; j < this.listaRepartidores[i].pedidos.length; j++) {
        if (
          pedidosAsignados.idPedido ===
          this.listaRepartidores[i].pedidos[j]["idPedido"]
        ) {
          this.repartidorxPedido = this.listaRepartidores[i];
        }
      }
    }
    //console.log(this.repartidorxPedido);
    this.nombreRepartidor = this.repartidorxPedido.nombre;
    this.apellidoRepartidor = this.repartidorxPedido.apellido;
    this.cedulaRepartidor = this.repartidorxPedido.cedula;
    this.telefonoRepartidor = this.repartidorxPedido.telefono;
  }

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

  sendOrder(pedidosAsignados) {
    console.log(pedidosAsignados);
    this.confirmationService.confirm({
      header: "Confirmación de pedido en camino",
      message: "¿Estás seguro de realizar esta acción?",
      accept: () => {
        this.pedido = pedidosAsignados;
        this.pedido.estadoDelPedido = 2;
        this.pedidoService.updatePedidos(this.pedido);
        this.showSuccess();
      },
    });
  }
  showSuccess() {
    this.messageService.add({
      severity: "success",
      summary: "Mensaje de confirmación",
      detail: "El pedido está en camino",
      life: 2000,
    });
  }

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
