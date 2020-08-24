import { Routes } from "@angular/router";

import { DashboardComponent } from "app/pages/dashboard/dashboard.component";
import { OnHoldComponent } from "app/pages/on-hold/on-hold.component";
import { DispatchedComponent } from "app/pages/dispatched/dispatched.component";
import { ReportNewsComponent } from "app/pages/report-news/report-news.component";
import { ReportSalesComponent } from "app/pages/report-sales/report-sales.component";
import { ReportProductComponent } from "app/pages/report-product/report-product.component";
import { ProductsComponent } from "app/pages/products/products.component";
import { UsersComponent } from "app/pages/users/users.component";
import { PromotionsComponent } from "app/pages/promotions/promotions.component";
import { CustomersComponent } from "app/pages/customers/customers.component";
import { ConflictingComponent } from "app/pages/conflicting/conflicting.component";
import { DeliveryNotificationComponent } from "app/pages/delivery-notification/delivery-notification.component";
import { UserNotificationComponent } from "app/pages/user-notification/user-notification.component";
import { ProductNewComponent } from "app/pages/product-new/product-new.component";
import { AssignedComponent } from "app/pages/assigned/assigned.component";
import { DeliverymanComponent } from "app/pages/deliveryman/deliveryman.component";
import { DeliveryOrderComponent } from "app/pages/delivery-order/delivery-order.component";
import { AuthDeliverymanGuard } from "app/core/guard/auth-deliveryman.guard";
import { PromotionNewComponent } from "app/pages/promotion-new/promotion-new.component";
import { CurrentPromotionComponent } from "app/pages/current-promotion/current-promotion.component";
import { OldPromotionComponent } from "app/pages/old-promotion/old-promotion.component";
import { AuthGuard } from "app/core/guard/auth.guard";
import { SalesComponent } from "app/pages/sales/sales.component";
import { ConfigurationComponent } from "app/pages/configuration/configuration.component";


export const AdminLayoutRoutes: Routes = [
  // {
  //   path: '',
  //   children: [ {
  //     path: 'dashboard',
  //     component: DashboardComponent
  // }]}, {
  // path: '',
  // children: [ {
  //   path: 'userprofile',
  //   component: UserProfileComponent
  // }]
  // }, {
  //   path: '',
  //   children: [ {
  //     path: 'icons',
  //     component: IconsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'notifications',
  //         component: NotificationsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'maps',
  //         component: MapsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'typography',
  //         component: TypographyComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'upgrade',
  //         component: UpgradeComponent
  //     }]
  // }
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: "on-hold", component: OnHoldComponent },
  { path: "assigned", component: AssignedComponent },
  { path: "dispatched", component: DispatchedComponent },
  {
    path: "report-news",
    component: ReportNewsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "report-sales",
    component: ReportSalesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "report-product",
    component: ReportProductComponent,
    canActivate: [AuthGuard],
  },
  { path: "products", component: ProductsComponent, canActivate: [AuthGuard] },
  {
    path: "promotions",
    component: PromotionsComponent,
    canActivate: [AuthGuard],
  },
  { path: "users", component: UsersComponent, canActivate: [AuthGuard] },
  {
    path: "customers",
    component: CustomersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "conflicting",
    component: ConflictingComponent,
    canActivate: [AuthGuard],
  },
  { path: "delivery-notification", component: DeliveryNotificationComponent },
  {
    path: "user-notification",
    component: UserNotificationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "product-new",
    component: ProductNewComponent,
    canActivate: [AuthGuard],
  },
  { path: "delivery", component: DeliverymanComponent },
  {
    path: "promotion-new",
    component: PromotionNewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "promotion-",
    component: PromotionNewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "current-promotion",
    component: CurrentPromotionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "sales",
    component: SalesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "old-promotion",
    component: OldPromotionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "delivery-order",
    component: DeliveryOrderComponent,
    canActivate: [AuthDeliverymanGuard],
  },
  {
    path: "configuration",
    component: ConfigurationComponent,
    canActivate: [AuthGuard],
  },
];