"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DeliverymanComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var api_1 = require("primeng/api");
var DeliverymanComponent = /** @class */ (function () {
    function DeliverymanComponent(formBuilder, router, deliveryManService, auth, messageService, userInfo, http) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.deliveryManService = deliveryManService;
        this.auth = auth;
        this.messageService = messageService;
        this.userInfo = userInfo;
        this.http = http;
    }
    DeliverymanComponent.prototype.ngOnInit = function () {
        this.buildForm();
    };
    DeliverymanComponent.prototype.ingresar = function () {
        var _this = this;
        if (this.form.valid) {
            this.repartidor = this.deliveryManService
                .getRepartidorLogin(this.form.value.cedula, this.form.value.pass)
                .subscribe(function (data) {
                _this.dato = data;
                if (_this.dato.length > 0) {
                    console.log(_this.dato);
                    _this.auth.saveIdStorage(_this.dato[0]['cedula']);
                    _this.router.navigate(['delivery-order']);
                }
                else {
                    _this.showDialog('Su usuario o contraseña son incorrectos');
                }
            }, function (err) {
                _this.showDialog('No se pudo verificar el usuario');
            });
        }
        else {
            this.showDialog('El formulario es inválido');
        }
    };
    DeliverymanComponent.prototype.buildForm = function () {
        this.form = this.formBuilder.group({
            cedula: new forms_1.FormControl('', [forms_1.Validators.required]),
            pass: new forms_1.FormControl('', [forms_1.Validators.required])
        });
    };
    // tslint:disable-next-line: use-life-cycle-interface
    DeliverymanComponent.prototype.ngOnDestroy = function () {
        if (this.repartidor) {
            this.repartidor.unsubscribe();
        }
    };
    DeliverymanComponent.prototype.showDialog = function (value) {
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: 'Error!',
            detail: value, life: 2000 });
    };
    DeliverymanComponent = __decorate([
        core_1.Component({
            selector: 'app-deliveryman',
            templateUrl: './deliveryman.component.html',
            styleUrls: ['./deliveryman.component.css'],
            providers: [api_1.MessageService]
        })
    ], DeliverymanComponent);
    return DeliverymanComponent;
}());
exports.DeliverymanComponent = DeliverymanComponent;
