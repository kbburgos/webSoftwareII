import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { AppComponent } from "./app.component";

//firebase
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { environment } from "../environments/environment";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AgmCoreModule } from "@agm/core";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./pages/login/login.component";

import { ProductoService } from "./core/services/product/producto.service";
import { PedidoService } from "./core/services/pedido/pedido.service";
import { DeliverymanService } from "./core/services/deliverman/deliveryman.service";
import { DeliverymanComponent } from "../app/pages/deliveryman/deliveryman.component";
import { DeliveryOrderComponent } from "./pages/delivery-order/delivery-order.component";
import { AuthDeliverymanGuard } from "./core/guard/auth-deliveryman.guard";
import { DialogModule } from "primeng/dialog";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { NgxSpinnerModule } from "ngx-spinner";
import { PromotionNewComponent } from "./pages/promotion-new/promotion-new.component";
//import { CurrentPromotionComponent } from './pages/current-promotion/current-promotion.component';
//import { OldPromotionComponent } from './pages/old-promotion/old-promotion.component';

import { TokenInterceptorService } from "./core/services/interceptor/token-interceptor.service";
import { UserInfoService } from "./core/services/userInfo/user-info.service";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFirestoreModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    //DialogModule,
    //ConfirmDialogModule,
    /*AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })*/
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    DeliverymanComponent,
    PromotionNewComponent,

    // CurrentPromotionComponent,
    //OldPromotionComponent,
  ],
  providers: [
    ProductoService,
    PedidoService,
    DeliverymanService,
    UserInfoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
