"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DispatchedComponent = void 0;
var core_1 = require("@angular/core");
var api_1 = require("primeng/api");
var DispatchedComponent = /** @class */ (function () {
    function DispatchedComponent(pedidosService, auhtService, productService, spinner, messageService) {
        this.pedidosService = pedidosService;
        this.auhtService = auhtService;
        this.productService = productService;
        this.spinner = spinner;
        this.messageService = messageService;
        this.token = this.auhtService.getJwtToken();
        this.pedidosDeApi = [];
        this.listaProductos = [];
        this.displayDetail = false;
    }
    DispatchedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.pedidosDespachados = this.pedidosService.getPedidosDispatchedFromApi(this.token).subscribe(function (item) {
            _this.pedidosDeApi = item;
        }, function (error) {
            _this.showMessage('No se pudo cargar los pedidos');
        });
        this.productosSubscribe = this.productService.getProductos().subscribe(function (item) {
            _this.productos = item;
            _this.spinner.hide();
        }, function (error) {
            _this.showMessage('No se pudo cargar los productos de los pedidos');
        });
    };
    DispatchedComponent.prototype.detailsProducts = function (productos, cantidades) {
        var productosSeleccionados = productos.split(',');
        this.displayDetail = true;
        this.listaProductos = [];
        var cantidadxProducto = cantidades.split(',');
        var productofinal = {};
        for (var i = 0; i < productosSeleccionados.length; i++) {
            for (var j = 0; j < this.productos.length; j++) {
                if (productosSeleccionados[i] === this.productos[j].idProducto) {
                    productofinal = {
                        'producto': this.productos[j].nombre,
                        'cantidad': cantidadxProducto[i]
                    };
                    this.listaProductos.push(productofinal);
                }
            }
        }
        // tslint:disable-next-line: radix
        this.cantidadTotalProductosxPedido = cantidadxProducto.reduce(function (a, b) { return parseInt(a) + parseInt(b); }, 0);
    };
    // tslint:disable-next-line: use-life-cycle-interface
    DispatchedComponent.prototype.ngOnDestroy = function () {
        if (this.productosSubscribe) {
            this.productosSubscribe.unsubscribe();
        }
        if (this.pedidosDespachados) {
            this.pedidosDespachados.unsubscribe();
        }
    };
    DispatchedComponent.prototype.showMessage = function (mensaje) {
        this.messageService.add({ severity: 'error', summary: 'Error!',
            detail: mensaje, life: 2000 });
    };
    DispatchedComponent = __decorate([
        core_1.Component({
            selector: 'app-dispatched',
            templateUrl: './dispatched.component.html',
            styleUrls: ['./dispatched.component.css'],
            providers: [api_1.MessageService]
        })
    ], DispatchedComponent);
    return DispatchedComponent;
}());
exports.DispatchedComponent = DispatchedComponent;
