import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    class: string;
    component: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',   class: '', component: 'DashboardComponent'},
    { path: '/on-hold', title: 'Pedidos en espera',   class: '', component: 'OnHoldComponent'},
    { path: '/dispatched', title: 'Pedidos despachados',  class: '', component: 'DispatchedComponent'},
    { path: '/report-news', title: 'Novedades',  class: '', component: 'ReportNewsComponent'},
    { path: '/report-sales', title: 'Ventas',  class: '', component: 'ReportSalesComponent'},
    { path: '/report-product', title: 'Productos',  class: '', component: 'ReportProductComponent'},
    { path: '/products', title: 'Lista de Productos',  class: '', component: 'ProductsComponent'},
    { path: '/promotions', title: 'Promociones',  class: '', component: 'PromotionsComponent'},
    { path: '/notifications', title: 'Notifications',  class: '', component:  'NotificationsComponent'},
    { path: '/upgrade', title: 'Upgrade to PRO',  class: 'active-pro', component: 'UpgradeComponent'},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
