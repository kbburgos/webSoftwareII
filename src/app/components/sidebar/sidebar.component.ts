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
    { path: '/assigned', title: 'Pedidos asignados',   class: '', component: 'AssignedComponent'},
    { path: '/dispatched', title: 'Pedidos despachados',  class: '', component: 'DispatchedComponent'},
    { path: '/report-news', title: 'Novedades',  class: '', component: 'ReportNewsComponent'},
    { path: '/report-sales', title: 'Ventas',  class: '', component: 'ReportSalesComponent'},
    { path: '/report-product', title: 'Productos',  class: '', component: 'ReportProductComponent'},
    { path: '/products', title: 'Productos',  class: '', component: 'ProductsComponent'},
    { path: '/promotions', title: 'Promociones',  class: '', component: 'PromotionsComponent'},
    
    { path: '/current-promotion', title: 'Activas',  class: '', component: 'CurrentPromotionComponent'},
    { path: '/old-promotion', title: 'Inactivas',  class: '', component: 'OldPromotionComponent'},
    
    { path: '/users', title: 'Usuarios',  class: '', component: 'UsersComponent'},
    { path: '/user-notification', title: 'Novedades de clientes a repartidores',  class: '', component: 'UserNotificationComponent'},
    { path: '/delivery-notification', title: 'Novedades de repartidores a clientes',  class: '', component: 'DeliveryNotificationComponent'},
    { path: '/customers', title: 'Clientes registrados',  class: '', component: 'CustomersComponent'},
    { path: '/conflicting', title: 'Clientes conflictivos',  class: '', component: 'ConflictingComponent'},
    { path: '/notifications', title: 'Notificaciones',  class: '', component:  'NotificationsComponent'},
    { path: '/upgrade', title: 'Upgrade to PRO',  class: 'active-pro', component: 'UpgradeComponent'},

    { path: '/configuration', title: 'Configuración de perfil',  class: 'active-pro', component: 'ConfigurationComponent'},
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
