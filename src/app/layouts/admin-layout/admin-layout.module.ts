import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Components
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { OnHoldComponent } from '../../pages/on-hold/on-hold.component';
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

//Services
import{ ProductoService } from '../../services/producto.service';
import { PromocionesService } from '../../services/promociones.service'

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
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {CardModule} from 'primeng/card';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CalendarModule} from 'primeng/calendar';
import {InputTextareaModule} from 'primeng/inputtextarea';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
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
    InputTextareaModule
  ],
  declarations: [
    DashboardComponent,
    OnHoldComponent,
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
  ],
  providers: [
    ProductoService,
    ConfirmationService,
    PromocionesService
  ]
})

export class AdminLayoutModule {}
