import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

//Components
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { OnHoldComponent } from '../../pages/on-hold/on-hold.component';
import { CurrentPromotionComponent } from '../../pages/current-promotion/current-promotion.component';
import { OldPromotionComponent } from '../../pages/old-promotion/old-promotion.component'
import { DispatchedComponent } from '../../pages/dispatched/dispatched.component';
import { ReportNewsComponent } from '../../pages/report-news/report-news.component';
import { ReportSalesComponent } from '../../pages/report-sales/report-sales.component';
import { ReportProductComponent } from '../../pages/report-product/report-product.component';
import { ProductsComponent } from '../../pages/products/products.component';
import { PromotionsComponent } from '../../pages/promotions/promotions.component';
import { UsersComponent } from '../../pages/users/users.component';
import { CustomersComponent } from '../../pages/customers/customers.component';
import { ConflictingComponent } from '../../pages/conflicting/conflicting.component';
import { DeliveryNotificationComponent } from '../../pages/delivery-notification/delivery-notification.component';
import { UserNotificationComponent } from '../../pages/user-notification/user-notification.component';
import { ProductNewComponent } from '../../pages/product-new/product-new.component';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//Services
import{ ProductoService } from '../../core/services/product/producto.service';
import { PromocionesService } from '../../core/services/product/promociones.service'
import { UserInfoService } from 'app/core/services/userInfo/user-info.service';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import {FileUploadModule} from 'primeng/fileupload';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {TabViewModule} from 'primeng/tabview';
import {ConfirmationService} from 'primeng/api';
import {CardModule} from 'primeng/card';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CalendarModule} from 'primeng/calendar';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { PedidoService } from 'app/core/services/pedido/pedido.service';
import { DeliverymanService } from 'app/core/services/deliverman/deliveryman.service';
import { AssignedComponent } from 'app/pages/assigned/assigned.component';
//import { DeliveryOrderComponent } from 'app/pages/delivery-order/delivery-order.component';
import { AuthDeliverymanGuard } from 'app/core/guard/auth-deliveryman.guard';
import {PanelModule} from 'primeng/panel';
import {AccordionModule} from 'primeng/accordion';
import {CarouselModule} from 'primeng/carousel';
import {TooltipModule} from 'primeng/tooltip';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {ChartModule} from 'primeng/chart';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { TokenInterceptorService } from "app/core/services/interceptor/token-interceptor.service"


@NgModule({
  imports: [
    CommonModule,
    ToastModule,
    TooltipModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CarouselModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
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
    AngularFireAuthModule,
    TabViewModule,
    ToastModule,
    ChartModule
  ],
  declarations: [
    DashboardComponent,
    OnHoldComponent,
    CurrentPromotionComponent,
    OldPromotionComponent,
    DispatchedComponent,
    ReportNewsComponent,
    ReportSalesComponent,
    ReportProductComponent,
    ProductsComponent,
    ProductNewComponent,
    PromotionsComponent,
    UsersComponent,
    CustomersComponent,
    ConflictingComponent,
    DeliveryNotificationComponent,
    UserNotificationComponent,
    AssignedComponent,
  ],
  providers: [
    ProductoService,
    ConfirmationService,
    PromocionesService,
    UserInfoService,
    PedidoService,
    DeliverymanService,
    AuthDeliverymanGuard,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ]
})

export class AdminLayoutModule {}
