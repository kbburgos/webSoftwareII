import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { OnHoldComponent } from '../../pages/on-hold/on-hold.component';
import { DispatchedComponent } from '../../pages/dispatched/dispatched.component';
import { ReportNewsComponent } from '../../pages/report-news/report-news.component';
import { ReportSalesComponent } from '../../pages/report-sales/report-sales.component';
import { ReportProductComponent } from '../../pages/report-product/report-product.component';
import { ProductsComponent } from '../../pages/products/products.component';
import { UsersComponent } from '../../pages/users/users.component';
import { PromotionsComponent } from '../../pages/promotions/promotions.component';
import { CustomersComponent } from '../../pages/customers/customers.component';
import { ConflictingComponent } from '../../pages/conflicting/conflicting.component';
import { ProductNewComponent } from '../../pages/product-new/product-new.component';
import { AssignedComponent } from 'app/pages/assigned/assigned.component';
import { DeliverymanComponent } from 'app/pages/deliveryman/deliveryman.component';

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
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'on-hold',        component: OnHoldComponent },
    { path: 'assigned',        component: AssignedComponent },
    { path: 'dispatched',     component: DispatchedComponent },
    { path: 'report-news',    component: ReportNewsComponent },
    { path: 'report-sales',   component: ReportSalesComponent },
    { path: 'report-product', component: ReportProductComponent },
    { path: 'products',       component: ProductsComponent},
    { path: 'promotions',     component: PromotionsComponent},
    { path: 'users',          component: UsersComponent},
    { path: 'customers',      component: CustomersComponent },
    { path: 'conflicting',    component: ConflictingComponent },
    { path: 'product-new',    component: ProductNewComponent},
    { path: 'delivery',    component: DeliverymanComponent },
];
