"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DeliveryOrderComponent = void 0;
var core_1 = require("@angular/core");
var api_1 = require("primeng/api");
var environment_1 = require("environments/environment");
var DeliveryOrderComponent = /** @class */ (function () {
    function DeliveryOrderComponent(deliveryManService, authDeliveryman, confirmationService, noveltyDelivermanService, orderService, productService, purchase, messageService, router, seguridad, spinner) {
        this.deliveryManService = deliveryManService;
        this.authDeliveryman = authDeliveryman;
        this.confirmationService = confirmationService;
        this.noveltyDelivermanService = noveltyDelivermanService;
        this.orderService = orderService;
        this.productService = productService;
        this.purchase = purchase;
        this.messageService = messageService;
        this.router = router;
        this.seguridad = seguridad;
        this.spinner = spinner;
        this.displayProducts = false;
        this.display = false;
        this.listaPedidosRepartidor = [];
        this.listaProductos = [];
        this.actual = new Date();
        this.horaRetiro = new Date().setMinutes(this.actual.getMinutes());
        this.cantidadCompras = 0;
    }
    DeliveryOrderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.horaRetiro = new Date(this.horaRetiro);
        this.noveltys = [
            { name: 'Cliente molestoso', value: 'cliente molestoso' },
            { name: 'Cliente falta respeto', value: 'Cliente falta respeto' },
            { name: 'Cliente se queja del pedido', value: 'Cliente se queja del pedido' },
        ];
        this.cedulaRepartidor = this.authDeliveryman.getdeliverIdStorage();
        this.deliveryman = this.deliveryManService.getDeliveryManByCedula(this.cedulaRepartidor).subscribe(function (data) {
            _this.repartidor = data[0];
            _this.dato = data[0]['pedidos'];
            _this.helloDialog(_this.repartidor);
            _this.spinner.hide();
        });
        this.productosSubscribe = this.productService.getProductos().subscribe(function (item) {
            _this.productos = item;
        });
        this.loginApi = this.authDeliveryman.loginToApi(environment_1.environment.emailRepartidor, environment_1.environment.passwRReartidor).subscribe(function (item) {
            _this.token = item.token;
        }, function (err) {
            _this.errorMessage("No se pudo acceder al api, recargue la página");
        });
    };
    // tslint:disable-next-line: use-life-cycle-interface
    DeliveryOrderComponent.prototype.ngOnDestroy = function () {
        if (this.deliveryman) {
            this.deliveryman.unsubscribe();
        }
        if (this.productosSubscribe) {
            this.productosSubscribe.unsubscribe();
        }
        if (this.obtenerpedido) {
            this.obtenerpedido.unsubscribe();
        }
        if (this.cambiarEstadoPedido) {
            this.cambiarEstadoPedido.unsubscribe();
        }
        if (this.enviarNovedad) {
            this.enviarNovedad.unsubscribe();
        }
        if (this.updateRpartidor) {
            this.updateRpartidor.unsubscribe();
        }
        if (this.loginApi) {
            this.loginApi.unsubscribe();
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
    };
    DeliveryOrderComponent.prototype.finalOrder = function (pedidoCulminado) {
        var _this = this;
        this.spinner.show();
        this.pedidoidDelRepartidor = pedidoCulminado.idPedido;
        this.pedidoDelRepartidor = pedidoCulminado;
        this.display = true;
        this.obtenerpedido = this.orderService.getPedidosByPedidoId(this.pedidoidDelRepartidor).subscribe(function (data) {
            _this.pedidoCambiaEstado = data[0];
        }, function (err) {
            _this.errorMessage("No se pudo cargar los pedidos, vuelva a refrescar la página");
        });
        this.verCompraApi = this.purchase.getPurchase(this.token).subscribe(function (item) {
            _this.cantidadCompras = item.length;
            _this.spinner.hide();
        });
    };
    DeliveryOrderComponent.prototype.detailsProducts = function (productos, cantidades) {
        this.displayProducts = true;
        this.listaProductos = [];
        var productofinal = {};
        for (var i = 0; i < productos.length; i++) {
            for (var j = 0; j < this.productos.length; j++) {
                if (productos[i] === this.productos[j].idProducto) {
                    productofinal = {
                        'producto': this.productos[j].nombre,
                        'cantidad': cantidades[i]
                    };
                    this.listaProductos.push(productofinal);
                }
            }
        }
        this.cantidadTotalProductosxPedido = cantidades.reduce(function (a, b) { return a + b; }, 0);
    };
    DeliveryOrderComponent.prototype.confirm = function () {
        var _this = this;
        this.confirmationService.confirm({
            message: '¿Está seguro?',
            header: 'Confirmación',
            icon: 'pi pi-exclamation-circle',
            accept: function () {
                _this.sendFinallyOrder(_this.pedidoCambiaEstado);
            }
        });
    };
    DeliveryOrderComponent.prototype.helloDialog = function (repartidor) {
        this.messageService.add({ severity: 'info', summary: 'BIENVENIDO',
            detail: repartidor.nombre + ' ' + repartidor.apellido, life: 1500 });
    };
    DeliveryOrderComponent.prototype.sendFinallyOrder = function (pedido) {
        var _this = this;
        var novedadRepartidor = '';
        if (this.selectednovelty != null) {
            novedadRepartidor = this.selectednovelty.value;
            this.ordenFinalizada = {
                idPedido: pedido.idPedido,
                idRepartidor: this.cedulaRepartidor,
                novedad: novedadRepartidor,
                idCliente: pedido.idUsuario,
                fecha: this.horaRetiro
            };
            this.enviarNovedad = this.noveltyDelivermanService.pushPedidoFinal(this.ordenFinalizada).then(function (data) {
                _this.display = false;
            })["catch"](function (err) {
                _this.errorMessage("No se pudo realizar enviar la novedad, vuelva a intentarlo");
            });
        }
        for (var i = 0; i < this.dato.length; i++) {
            if (this.dato[i].idPedido === pedido.idPedido) {
                this.dato.splice(i, 1);
            }
        }
        this.updateRpartidor = this.deliveryManService.updateDeliveryMan(this.repartidor);
        var productoApi = '';
        var cantidadApi = '';
        for (var i = 0; i < pedido.productos.length; i++) {
            productoApi = productoApi + pedido.productos[i] + ',';
            cantidadApi += pedido.cantidades[i] + ',';
        }
        cantidadApi = cantidadApi.substring(0, cantidadApi.length - 1);
        productoApi = productoApi.substring(0, productoApi.length - 1);
        var idCompraApi = this.cantidadCompras + 1;
        var compraNueva = {
            idcompra: null,
            idusuario: pedido.idUsuario,
            entregaDomocilio: pedido.isDomicilio
        };
        this.crearCompraApi = this.purchase.createPurchase(this.token, compraNueva).subscribe(function (item) {
            _this.confirmationAction('compra');
        }, function (err) {
            _this.errorMessage("No se pudo realizar la compra, vuelva a intentarlo");
        });
        this.cantidadTotalProductosxPedido = pedido.cantidades.reduce(function (a, b) { return a + b; }, 0);
        var pedidoNuevo = {
            idpedido: null,
            idcompra: idCompraApi,
            idproducto: productoApi,
            cantidad: cantidadApi,
            subtotal: pedido.total,
            cubiertos: pedido.cubiertos,
            estado: '3'
        };
        this.crearPedidoApi = this.orderService.setPedidosToDispatched(this.token, pedidoNuevo).subscribe(function (item) {
            _this.confirmationAction('pedido');
        }, function (error) {
            _this.errorMessage("No se pudo realizar el pedido, vuelva a intentarlo");
        });
        this.display = false;
        this.deleteOrder = this.orderService.deletePedido(pedido.idPedido);
    };
    DeliveryOrderComponent.prototype.logOut = function () {
        this.authDeliveryman.removeTokens();
        this.router.navigate(['deliveryman']);
    };
    DeliveryOrderComponent.prototype.confirmationAction = function (data) {
        var mensaje = '';
        if (data === 'compra') {
            mensaje = 'La compra finalizó con éxito';
        }
        else if (data === 'pedido') {
            mensaje = 'El pedido finalizó con éxito';
        }
        this.messageService.add({ severity: 'success', summary: 'CONFIRMACIÓN',
            detail: mensaje, life: 1500 });
    };
    DeliveryOrderComponent.prototype.errorMessage = function (mensaje) {
        this.messageService.add({ severity: 'warning', summary: 'Mensaje de error',
            detail: mensaje, life: 2000 });
    };
    DeliveryOrderComponent = __decorate([
        core_1.Component({
            selector: 'app-delivery-order',
            templateUrl: './delivery-order.component.html',
            styleUrls: ['./delivery-order.component.css'],
            providers: [api_1.MessageService]
        })
    ], DeliveryOrderComponent);
    return DeliveryOrderComponent;
}());
exports.DeliveryOrderComponent = DeliveryOrderComponent;
