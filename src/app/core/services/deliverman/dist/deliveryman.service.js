"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DeliverymanService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../../../environments/environment");
var operators_1 = require("rxjs/operators");
var CryptoJS = require("crypto-js");
var DeliverymanService = /** @class */ (function () {
    function DeliverymanService(firebase, seguridad) {
        this.firebase = firebase;
        this.seguridad = seguridad;
    }
    DeliverymanService.prototype.getRepartidores = function () {
        return this.firebase
            .collection(environment_1.environment.nombresColecciones.repartidor)
            .snapshotChanges()
            .pipe(operators_1.map(function (repartidor) {
            return repartidor.map(function (e) {
                return e.payload.doc.data();
            });
        }));
    };
    DeliverymanService.prototype.updateDeliveryMan = function (deliveryman) {
        this.DeliverDoc = this.firebase.doc("repartidor/" + deliveryman.idRepartidor);
        this.DeliverDoc.update(deliveryman);
    };
    DeliverymanService.prototype.getDeliveryManByCedula = function (cedula) {
        return this.firebase
            .collection(environment_1.environment.nombresColecciones.repartidor, function (ref) {
            return ref.where('cedula', '==', cedula);
        })
            .snapshotChanges()
            .pipe(operators_1.map(function (repartidor) {
            return repartidor.map(function (e) {
                return e.payload.doc.data();
            });
        }));
    };
    DeliverymanService.prototype.getRepartidorLogin = function (cedula, contrasena) {
        return this.firebase
            .collection(environment_1.environment.nombresColecciones.repartidor, function (ref) {
            return ref.where('cedula', '==', cedula).where('contrasenia', '==', contrasena);
        })
            .snapshotChanges()
            .pipe(operators_1.map(function (repartidor) {
            return repartidor.map(function (e) {
                return e.payload.doc.data();
            });
        }));
    };
    DeliverymanService.prototype.getClientIdStorage = function () {
        var encryptext = localStorage.getItem('cliente');
        var decrypt = CryptoJS.AES.decrypt(encryptext.trim(), environment_1.environment.keyCrypto.trim()).toString(CryptoJS.enc.Utf8);
        return decrypt;
    };
    DeliverymanService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DeliverymanService);
    return DeliverymanService;
}());
exports.DeliverymanService = DeliverymanService;
