"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.DashboardComponent = void 0;
var core_1 = require("@angular/core");
var Chartist = require("chartist");
var api_1 = require("primeng/api");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(userService, productService, spinner, auth, seguridad, messageService, pedidoService) {
        this.userService = userService;
        this.productService = productService;
        this.spinner = spinner;
        this.auth = auth;
        this.seguridad = seguridad;
        this.messageService = messageService;
        this.pedidoService = pedidoService;
        this.token = this.auth.getJwtToken();
        this.numeroVentas = [];
        this.numeroPedidosLocal = 0;
        this.numeroPedidosDomicilio = 0;
        this.productos = [];
        this.display = false;
        this.cols = [];
        this.listaProductos = [];
    }
    DashboardComponent.prototype.startAnimationForLineChart = function (chart) {
        var seq, delays, durations;
        seq = 0;
        delays = 80;
        durations = 500;
        chart.on('draw', function (data) {
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
            }
            else if (data.type === 'point') {
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
    ;
    DashboardComponent.prototype.startAnimationForBarChart = function (chart) {
        var seq2, delays2, durations2;
        seq2 = 0;
        delays2 = 80;
        durations2 = 500;
        chart.on('draw', function (data) {
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
    ;
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.sortOptions = [
            { label: 'Mayor valor', value: '!total' },
            { label: 'Menor Valor', value: 'total' },
        ];
        this.pedidosSubscribe = this.pedidoService.getPedidosByEstado(0).subscribe(function (item) {
            _this.pedidosEntrantes = item;
            _this.cantidadPedidos = _this.pedidosEntrantes.length;
            _this.spinner.hide();
        }, function (error) {
            _this.errorMessage('No se pudo cargar los pedidos');
        });
        this.productosSubscribe = this.productService.getProductos().subscribe(function (item) {
            _this.productos = item;
        }, function (error) {
            _this.errorMessage('No se pudo cargar los productos de los pedidos');
        });
        this.pedidosApi = this.pedidoService.getPedidosDispatchedFromApi(this.token).subscribe(function (item) {
            _this.pedidosEntrantesApi = item;
            for (var i = 0; i < _this.pedidosEntrantesApi.length; i++) {
                _this.numeroVentas.push(_this.pedidosEntrantesApi[i].subtotal);
                if (_this.pedidosEntrantesApi[i].compra['entregaDomocilio']) {
                    _this.numeroPedidosDomicilio += 1;
                }
                else {
                    _this.numeroPedidosLocal += 1;
                }
            }
            _this.ventasTotales = _this.numeroVentas.reduce(function (a, b) { return a + b; }, 0);
        }, function (error) {
            _this.errorMessage('No se pudo cargar las ventas');
        });
        /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
        var dataDailySalesChart = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [12, 17, 7, 17, 23, 18, 38]
            ]
        };
        var optionsDailySalesChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 50,
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
        };
        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
        this.startAnimationForLineChart(dailySalesChart);
        /* ----------==========     Completed Tasks Chart initialization    ==========---------- */
        var dataCompletedTasksChart = {
            labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
            series: [
                [230, 750, 450, 300, 280, 240, 200, 190]
            ]
        };
        var optionsCompletedTasksChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 1000,
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
        };
        var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);
        // start animation for the Completed Tasks Chart - Line Chart
        this.startAnimationForLineChart(completedTasksChart);
        /* ----------==========     Emails Subscription Chart initialization    ==========---------- */
        var datawebsiteViewsChart = {
            labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
            series: [
                [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
            ]
        };
        var optionswebsiteViewsChart = {
            axisX: {
                showGrid: false
            },
            low: 0,
            high: 1000,
            chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
        };
        var responsiveOptions = [
            ['screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX: {
                        labelInterpolationFnc: function (value) {
                            return value[0];
                        }
                    }
                }]
        ];
        var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);
        // start animation for the Emails Subscription Chart
        this.startAnimationForBarChart(websiteViewsChart);
    };
    DashboardComponent.prototype.onSortChange = function () {
        console.log(this.sortKey);
        if (this.sortKey.indexOf('!') === 0) {
            this.sort(-1);
        }
        else if (this.sortKey.indexOf('!') === -1) {
            this.sort(1);
        }
    };
    DashboardComponent.prototype.sort = function (order) {
        var pedidos = __spreadArrays(this.pedidosEntrantes);
        pedidos.sort(function (data1, data2) {
            var value1 = data1.total;
            var value2 = data2.total;
            var result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
            return (order * result);
        });
        this.pedidosEntrantes = pedidos;
    };
    DashboardComponent.prototype.selectPedido = function (pedido) {
        this.display = true;
        this.listaProductos = [];
        var productofinal = {};
        for (var i = 0; i < pedido.productos.length; i++) {
            for (var j = 0; j < this.productos.length; j++) {
                if (pedido.productos[i] === this.productos[j].idProducto) {
                    productofinal = {
                        'producto': this.productos[j].nombre,
                        'cantidad': pedido.cantidades[i]
                    };
                    this.listaProductos.push(productofinal);
                }
            }
        }
        this.cantidadTotalProductosxPedido = pedido.cantidades.reduce(function (a, b) { return a + b; }, 0);
    };
    // tslint:disable-next-line: use-life-cycle-interface
    DashboardComponent.prototype.ngOnDestroy = function () {
        if (this.productosSubscribe) {
            this.productosSubscribe.unsubscribe();
        }
        if (this.pedidosSubscribe) {
            this.pedidosSubscribe.unsubscribe();
        }
    };
    DashboardComponent.prototype.errorMessage = function (mensaje) {
        this.messageService.add({ severity: 'error', summary: 'Error!',
            detail: mensaje, life: 5000 });
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.css'],
            providers: [api_1.MessageService]
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
