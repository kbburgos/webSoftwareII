import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { UsersService } from 'app/core/services/user/users.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'app/core/services/auth/auth.service';
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
  productos: Producto[] = [];
  sortKey: string;
  cantidadTotalProductosxPedido: number;
  cantidadPedidos: number;
  display = false;
  cols = [];
  listaProductos: Array<any> = [];
  productoTmp = 0;
  private pedidosSubscribe;
  private productosSubscribe;
  private pedidosApi;
  constructor(private userService: UsersService,
    private productService: ProductoService,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private seguridad: SeguridadService,
    private messageService: MessageService,
    private pedidoService: PedidoService ) { }
  startAnimationForLineChart(chart) {
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if (data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if (data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart) {
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if (data.type === 'bar') {
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {
    this.mapa = new Map();
    this.spinner.show();
    this.sortOptions = [
      {label: 'Mayor valor', value: '!total'},
      {label: 'Menor Valor', value: 'total'},
    ];
    this.pedidosSubscribe = this.pedidoService.getPedidosByEstado(0).subscribe( (item: any) => {
      this.pedidosEntrantes = item;
      this.cantidadPedidos = this.pedidosEntrantes.length;
      this.spinner.hide();
    }, error => {
      this.errorMessage('No se pudo cargar los pedidos');
    });

    this.productosSubscribe = this.productService.getProductos().subscribe((item: any ) => {
      this.productos = item;
    }, error => {
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











      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 17, 7, 17, 23, 18, 38]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      const dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      const dataCompletedTasksChart: any = {
          labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
          series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
          ]
      };

     const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      const completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
      this.startAnimationForLineChart(completedTasksChart);



      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      const datawebsiteViewsChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      };
      const optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      const responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      const websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      // start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(websiteViewsChart);
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

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    if (this.productosSubscribe) {
      this.productosSubscribe.unsubscribe();
    }
    if (this.pedidosSubscribe) {
      this.pedidosSubscribe.unsubscribe();
    }
  }
  errorMessage(mensaje: string) {
    this.messageService.add(
      {severity: 'error', summary: 'Error!',
      detail: mensaje, life: 5000 });
  }
}
