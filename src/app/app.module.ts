import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppComponent } from './app.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductoService } from './core/services/product/producto.service';
import { PedidoService } from './core/services/pedido/pedido.service';
import { DeliverymanService } from './core/services/deliverman/deliveryman.service';
import { DeliverymanComponent } from '../app/pages/deliveryman/deliveryman.component';
import { DeliveryOrderComponent } from './pages/delivery-order/delivery-order.component';
import { AuthDeliverymanGuard } from './core/guard/auth-deliveryman.guard';
import { DialogModule } from 'primeng/dialog';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire'
import { NgxSpinnerModule } from 'ngx-spinner';
import { TokenInterceptorService } from './core/services/interceptor/token-interceptor.service';
import { UserInfoService } from './core/services/userInfo/user-info.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AccordionModule } from 'primeng/accordion';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordComponent } from './pages/password/password.component';

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
    TableModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    FlexLayoutModule,
    CardModule,
    RadioButtonModule,
    CalendarModule,
    InputTextareaModule,
    NgxSpinnerModule,
    CheckboxModule,
    FileUploadModule,
    AccordionModule,
    TabViewModule,
    ToastModule,
    DropdownModule,
    // DialogModule,
    // ConfirmDialogModule,
    /*AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })*/
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    DeliverymanComponent,
    DeliveryOrderComponent,
    PasswordComponent
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

    ConfirmationService,

    AuthDeliverymanGuard,
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}