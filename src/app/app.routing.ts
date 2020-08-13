import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "../app/pages//login/login.component";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { DeliverymanComponent } from "./pages/deliveryman/deliveryman.component";
import { DeliveryOrderComponent } from "./pages/delivery-order/delivery-order.component";
import { AuthDeliverymanGuard } from "./auth/guard/auth-deliveryman.guard";


const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "",
    redirectTo: "deliveryman",
    pathMatch: "full",
  },
  {
    path: "deliveryman",
    component: DeliverymanComponent,
  },
  /*{
    path: "",
    redirectTo: "delivery-order",
    pathMatch: "full",
  },
  {
    path: "delivery-order",
    component: DeliveryOrderComponent,
  },*/
  {
    path: "dashboard",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule",
      },
    ],
  },
  
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false,
    }),
  ],

  exports: [],
})
export class AppRoutingModule {}
