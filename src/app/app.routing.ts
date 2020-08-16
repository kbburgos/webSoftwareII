import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "../app/pages//login/login.component";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { DeliverymanComponent } from "./pages/deliveryman/deliveryman.component";
import { DeliveryOrderComponent } from "./pages/delivery-order/delivery-order.component";
import { AuthDeliverymanGuard } from "./core/guard/auth-deliveryman.guard";
import { AuthGuard } from "./core/guard/auth.guard";
import { RandomGuardGuard } from "./core/guard/random-guard.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
    //canActivate: [AuthGuard]
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
  {
    path: "dashboard",
    redirectTo: "dashboard",
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule",
        canLoad: [RandomGuardGuard],
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],

  exports: [],
})
export class AppRoutingModule {}
