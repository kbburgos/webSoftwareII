import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { OnHoldComponent } from '../../on-hold/on-hold.component';
import { DispatchedComponent } from '../../dispatched/dispatched.component';
import { ReportNewsComponent } from '../../report-news/report-news.component';
import { ReportSalesComponent } from '../../report-sales/report-sales.component';
import { ReportProductComponent } from '../../report-product/report-product.component';
import { ProductsComponent } from '../../products/products.component';
import { UsersComponent } from '../../users/users.component';
import { PromotionsComponent } from '../../promotions/promotions.component';
import { CustomersComponent } from '../../customers/customers.component';
import { ConflictingComponent } from '../../conflicting/conflicting.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

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
    { path: 'dispatched',     component: DispatchedComponent },
    { path: 'report-news',    component: ReportNewsComponent },
    { path: 'report-sales',   component: ReportSalesComponent },
    { path: 'report-product', component: ReportProductComponent },
    { path: 'products',       component: ProductsComponent},
    { path: 'promotions',     component: PromotionsComponent},
    { path: 'users',          component: UsersComponent},
    { path: 'customers',      component: CustomersComponent },
    { path: 'conflicting',    component: ConflictingComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
];
