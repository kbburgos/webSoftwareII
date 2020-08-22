"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OnHoldComponent = void 0;
var core_1 = require("@angular/core");
var api_1 = require("primeng/api");
var OnHoldComponent = /** @class */ (function () {
    function OnHoldComponent(pedidoService, deliveryManService, productService, messageService, auth, userService, purchase, seguridadService, spinner, confirmationService) {
        this.pedidoService = pedidoService;
        this.deliveryManService = deliveryManService;
        this.productService = productService;
        this.messageService = messageService;
        this.auth = auth;
        this.userService = userService;
        this.purchase = purchase;
        this.seguridadService = seguridadService;
        this.spinner = spinner;
        this.confirmationService = confirmationService;
        this.loading = true;
        this.display = false;
        this.listaProductos = [];
        this.token = this.auth.getJwtToken();
        this.disabledButtonEraser = true;
        this.fechaActual = new Date();
        this.cantidadCompras = 0;
        this.permiso = this.seguridadService.encriptar(this.token);
    }
    OnHoldComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.pedidosDomicilio = [];
        this.pedidosLocal = [];
        this.repartidores = [];
        this.listaPedidos = [];
        this.pedidosDomicilioSuscribe = this.pedidoService.getPedidosByEstadoByTipo(0, true).subscribe(function (item) {
            _this.pedidosDomicilio = item;
        });
        this.pedidosLocalSuscribe = this.pedidoService.getPedidosByEstadoByTipo(0, false).subscribe(function (item) {
            _this.pedidosLocal = item;
            for (var i = 0; i < _this.pedidosLocal.length; i++) {
                _this.pedidosLocal[i].horaDeRetiro = (_this.pedidosLocal[i].horaDeRetiro.toDate());
                if (_this.pedidosLocal[i].horaDeRetiro < _this.fechaActual) {
                    _this.disabledButtonEraser = false;
                }
                else if (_this.pedidosLocal[i].horaDeRetiro > _this.fechaActual) {
                    _this.disabledButtonEraser = true;
                }
            }
            _this.spinner.hide();
        });
        this.repartidoresSuscribe = this.deliveryManService.getRepartidores().subscribe(function (item) {
            _this.repartidores = item;
        });
        this.productosSubscribe = this.productService.getProductos().subscribe(function (item) {
            _this.productos = item;
        });
        this.clientexIdSubscribe = this.userService.usuarios(this.token).subscribe(function (item) {
            _this.listaClientes = item;
        });
    };
    OnHoldComponent.prototype.detailsProducts = function (productos, cantidades) {
        this.display = true;
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
    OnHoldComponent.prototype.assinggnOrder = function (pedido) {
        var cliente;
        for (var i = 0; i < this.listaClientes.length; i++) {
            if (this.listaClientes[i].cedula === pedido.idUsuario) {
                cliente = this.listaClientes[i];
            }
        }
        this.repartidores.sort(function (a, b) {
            if (a.pedidos.length < b.pedidos.length) {
                return -1;
            }
        });
        this.pedido = pedido;
        this.pedido.estadoDelPedido = 1;
        this.pedidoService.updatePedidos(this.pedido);
        this.listaPedidos = this.repartidores[0].pedidos;
        this.listaPedidos.push({ 'idPedido': pedido.idPedido,
            'codigoCliente': cliente.cedula,
            'nombreCliente': cliente.nombre + ' ' + cliente.apellido,
            'productos': pedido.productos,
            'cantidades': pedido.cantidades
        });
        this.deliveryManService.updateDeliveryMan(this.repartidores[0]);
        this.notifyOrder(this.repartidores[0], cliente);
        this.showSuccess('repartidor');
    };
    OnHoldComponent.prototype.changeState = function (pedido) {
        var _this = this;
        this.pedido = pedido;
        console.log(this.pedido.cantidades);
        var productoApi = '';
        var cantidadApi = '';
        for (var i = 0; i < this.pedido.productos.length; i++) {
            productoApi += this.pedido.productos[i] + ',';
            cantidadApi += this.pedido.cantidades[i] + ',';
            console.log("cantidad del for: ", cantidadApi, this.pedido.cantidades[i]);
        }
        cantidadApi = cantidadApi.substring(0, cantidadApi.length - 1);
        productoApi = productoApi.substring(0, productoApi.length - 1);
        var compraNueva = {
            idcompra: null,
            idusuario: this.pedido.idUsuario,
            entregaDomocilio: this.pedido.isDomicilio
        };
        this.crearCompraApi = this.purchase.createPurchase(this.token, compraNueva).subscribe(function (item) {
            console.log(item);
            _this.spinner.hide();
        }, function (error) {
            _this.errorMessage("No se pudo realizar la compra, vuelva a intentarlo");
            console.log(error);
        });
        this.cantidadTotalProductosxPedido = this.pedido.cantidades.reduce(function (a, b) { return a + b; }, 0);
        var idCompraApi = this.cantidadCompras + 1;
        var pedidoNuevo = {
            idpedido: null,
            idcompra: idCompraApi,
            idproducto: productoApi,
            cantidad: cantidadApi,
            subtotal: this.pedido.total,
            cubiertos: this.pedido.cubiertos,
            estado: '3'
        };
        this.crearPedidoApi = this.pedidoService.setPedidosToDispatched(this.token, pedidoNuevo).subscribe(function (item) {
            console.log(item);
        }, function (error) {
            _this.errorMessage("No se pudo realizar el pedido, vuelva a intentarlo");
            console.log(error);
        });
        this.showSuccess('local');
    };
    // tslint:disable-next-line: use-life-cycle-interface
    OnHoldComponent.prototype.ngOnDestroy = function () {
        if (this.pedidosDomicilioSuscribe) {
            this.pedidosDomicilioSuscribe.unsubscribe();
        }
        if (this.pedidosLocalSuscribe) {
            this.pedidosLocalSuscribe.unsubscribe();
        }
        if (this.repartidoresSuscribe) {
            this.repartidoresSuscribe.unsubscribe();
        }
        if (this.productosSubscribe) {
            this.productosSubscribe.unsubscribe();
        }
        if (this.clientexIdSubscribe) {
            this.clientexIdSubscribe.unsubscribe();
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
    OnHoldComponent.prototype.notifyOrder = function (repartidor, cliente) {
        var json;
        var direccion;
        var coordenadas;
        var telefono = repartidor.telefono;
        var telefono2 = '593995248654';
        var url_prueba = 'http://localhost:4200/deliveryman';
        if (this.pedido.direccionEntrega === 'S') {
            json = JSON.parse(JSON.stringify(cliente.direccion));
            direccion = JSON.parse(json);
            console.log('vieja: ', direccion);
        }
        else {
            json = JSON.parse(JSON.stringify(this.pedido.direccionEntrega));
            direccion = JSON.parse(json);
            console.log('nueva: ', direccion);
        }
        coordenadas = direccion.coordenadas.split(',');
        var mapa = 'https://www.google.com/maps/search/?api=1%26query=' + coordenadas[1] + ',' + coordenadas[0];
        var cuerpo_mensaje = 'Hola ' + repartidor.nombre + ', el código del pedido es *' + this.pedido.idPedido +
            '*, el cliente es *' + cliente.nombre + ' ' + cliente.apellido +
            '*, la dirección es ' + direccion.direccion + ', su referencia es ' + direccion.referencia +
            ', puedes  ubicarte con: ' + mapa +
            ' . Usa este enlace para finalizar el pedido ' + url_prueba;
        window.open('https://api.whatsapp.com/send?phone=' + telefono + '&text=' + cuerpo_mensaje);
    };
    OnHoldComponent.prototype.showSuccess = function (esRepartidor) {
        var detail;
        if (esRepartidor === 'repartidor') {
            detail = 'El pedido se asignó correctamente';
        }
        else if (esRepartidor === 'local') {
            detail = 'Se despachó el pedido correctamente';
        }
        else if (esRepartidor === 'eliminar') {
            detail = 'El pedido se eliminó correctamente';
        }
        this.messageService.add({ severity: 'success', summary: 'Mensaje de confirmación',
            detail: detail, life: 2000 });
    };
    OnHoldComponent.prototype.errorMessage = function (mensaje) {
        this.messageService.add({ severity: 'warning', summary: 'Mensaje de error',
            detail: mensaje, life: 2000 });
    };
    OnHoldComponent.prototype.createConfirmMessage = function (mensaje) {
        this.messageService.add({ severity: 'success', summary: 'Mensaje de confirmación',
            detail: mensaje, life: 2000 });
    };
    OnHoldComponent.prototype.confirm = function (pedido) {
        var _this = this;
        this.verCompraApi = this.purchase.getPurchase(this.token).subscribe(function (item) {
            _this.cantidadCompras = item.length;
            console.log("cantidad de compra generada en ngoninit: ", _this.cantidadCompras);
        });
        this.confirmationService.confirm({
            header: 'Enviar el pedido a Pedidos Despachados',
            message: '¿Estás seguro de realizar esta acción?',
            accept: function () {
                _this.spinner.show();
                _this.changeState(pedido);
                _this.deleteOrder = _this.pedidoService.deletePedido(_this.pedido.idPedido);
            }
        });
    };
    OnHoldComponent.prototype.eraserOrder = function (pedido) {
        var _this = this;
        this.confirmationService.confirm({
            header: 'Eliminar pedido',
            message: '¿Está seguro que el pedido no fue retirado?',
            accept: function () {
                _this.pedido = pedido;
                /*this.pedido.estadoDelPedido = 4;
                this.pedidoService.updatePedidos(this.pedido);*/
                _this.deleteOrder = _this.pedidoService.deletePedido(pedido.idPedido);
                _this.showSuccess('eliminar');
            }
        });
    };
    OnHoldComponent = __decorate([
        core_1.Component({
            selector: 'app-on-hold',
            templateUrl: './on-hold.component.html',
            styleUrls: ['./on-hold.component.css'],
            providers: [api_1.MessageService]
        })
    ], OnHoldComponent);
    return OnHoldComponent;
}());
exports.OnHoldComponent = OnHoldComponent;
