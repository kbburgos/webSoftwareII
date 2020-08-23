"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AssignedComponent = void 0;
var core_1 = require("@angular/core");
var api_1 = require("primeng/api");
var AssignedComponent = /** @class */ (function () {
    function AssignedComponent(pedidoService, http, spinner, messageService, deliveryManService, productService, confirmationService, authService) {
        this.pedidoService = pedidoService;
        this.http = http;
        this.spinner = spinner;
        this.messageService = messageService;
        this.deliveryManService = deliveryManService;
        this.productService = productService;
        this.confirmationService = confirmationService;
        this.authService = authService;
        this.displayDetail = false;
        this.displayDeliveryman = false;
        this.pedidosDomicilioAsignados = [];
        this.listaProductos = [];
    }
    AssignedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.pedidosAsignadosSubscribe = this.pedidoService.getPedidosByEstado(1).subscribe(function (item) {
            _this.pedidosDomicilioAsignados = item;
            _this.spinner.hide();
        }, function (error) {
            _this.showAlert('No se pudo cargar los pedidos');
        });
        this.productosSubscribe = this.productService
            .getProductos()
            .subscribe(function (item) {
            _this.productos = item;
        }, function (error) {
            _this.showAlert('No se pudo cargar los productos de los pedidos');
        });
        this.repartidoresSubscribe = this.deliveryManService
            .getRepartidores()
            .subscribe(function (item) {
            _this.listaRepartidores = item;
        }, function (error) {
            _this.showAlert('No se pudo cargar el detalle de los repartidores');
        });
    };
    AssignedComponent.prototype.viewMoreInformationDelivery = function (pedidosAsignados) {
        this.displayDeliveryman = true;
        for (var i = 0; i < this.listaRepartidores.length; i++) {
            for (var j = 0; j < this.listaRepartidores[i].pedidos.length; j++) {
                if (pedidosAsignados.idPedido ===
                    this.listaRepartidores[i].pedidos[j]['idPedido']) {
                    this.repartidorxPedido = this.listaRepartidores[i];
                }
            }
        }
        // console.log(this.repartidorxPedido);
        this.nombreRepartidor = this.repartidorxPedido.nombre;
        this.apellidoRepartidor = this.repartidorxPedido.apellido;
        this.cedulaRepartidor = this.repartidorxPedido.cedula;
        this.telefonoRepartidor = this.repartidorxPedido.telefono;
    };
    AssignedComponent.prototype.detailsProducts = function (productos, cantidades) {
        this.displayDetail = true;
        this.listaProductos = [];
        var productofinal = {};
        for (var i = 0; i < productos.length; i++) {
            for (var j = 0; j < this.productos.length; j++) {
                if (productos[i] === this.productos[j].idProducto) {
                    productofinal = {
                        producto: this.productos[j].nombre,
                        cantidad: cantidades[i]
                    };
                    this.listaProductos.push(productofinal);
                }
            }
        }
        this.cantidadTotalProductosxPedido = cantidades.reduce(function (a, b) { return a + b; }, 0);
    };
    AssignedComponent.prototype.sendOrder = function (pedidosAsignados) {
        var _this = this;
        console.log(pedidosAsignados);
        this.confirmationService.confirm({
            header: 'Confirmación de pedido en camino',
            message: '¿Estás seguro de realizar esta acción?',
            accept: function () {
                _this.pedido = pedidosAsignados;
                _this.pedido.estadoDelPedido = 2;
                _this.pedidoService.updatePedidos(_this.pedido);
                _this.showSuccess('El pedido se está enviando');
            }
        });
    };
    AssignedComponent.prototype.showSuccess = function (mensaje) {
        this.messageService.add({
            severity: 'success',
            summary: 'Enviando!',
            detail: mensaje,
            life: 2000
        });
    };
    AssignedComponent.prototype.showAlert = function (mensaje) {
        this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: mensaje,
            life: 2000
        });
    };
    // tslint:disable-next-line: use-life-cycle-interface
    AssignedComponent.prototype.ngOnDestroy = function () {
        if (this.pedidosAsignadosSubscribe) {
            this.pedidosAsignadosSubscribe.unsubscribe();
        }
        if (this.repartidoresSubscribe) {
            this.repartidoresSubscribe.unsubscribe();
        }
        if (this.productosSubscribe) {
            this.productosSubscribe.unsubscribe();
        }
    };
    AssignedComponent = __decorate([
        core_1.Component({
            selector: 'app-assigned',
            templateUrl: './assigned.component.html',
            styleUrls: ['./assigned.component.css'],
            providers: [api_1.MessageService]
        })
    ], AssignedComponent);
    return AssignedComponent;
}());
exports.AssignedComponent = AssignedComponent;
