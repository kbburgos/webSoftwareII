import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OnHoldComponent } from './pages/on-hold/on-hold.component';
import { DispatchedComponent} from './pages/dispatched/dispatched.component';
import { ProductsComponent } from './pages/products/products.component';
import { ReportNewsComponent } from './pages/report-news/report-news.component';
import { ReportSalesComponent } from './pages/report-sales/report-sales.component';
import { ReportProductComponent } from './pages/report-product/report-product.component';
import { PromotionsComponent } from './pages/promotions/promotions.component';
import { UsersComponent } from './pages/users/users.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { ConflictingComponent } from './pages/conflicting/conflicting.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
