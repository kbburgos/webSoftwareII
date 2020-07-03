import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-report-product',
  templateUrl: './report-product.component.html',
  styleUrls: ['./report-product.component.css']
})
export class ReportProductComponent  implements OnInit {
  listreportproduct: ReportProduct[];
  cols: any[];
  constructor() { }

  ngOnInit() {
    this.listreportproduct=[
      {producto: 'Batido de fresa', ventas: 50, stock: 100, montoTotal: 90, foto: ''},
      {producto: 'Espresso', ventas: 80, stock: 250, montoTotal: 120, foto: ''},
      {producto: 'Capuchino', ventas: 30, stock: 300, montoTotal: 70, foto: ''},
      {producto: 'Crepa', ventas: 10, stock: 150, montoTotal: 50, foto: ''},
      {producto: 'Donas', ventas: 70, stock: 130, montoTotal: 115, foto: ''},
      {producto: 'Cupcakes', ventas: 48, stock: 80, montoTotal: 60, foto: ''},
    ];
    this.cols=[
      {field: 'producto', header: 'CODIGO'},
      {field: 'ventas', header: 'VENTAS'},
      {field: 'stock', header: 'STOCK'},
      {field: 'montoTotal', header: 'MONTO TOTAL'},
      {field: 'foto', header: 'FOTO'},
    ];
  }

}

export interface ReportProduct {
  producto: string;
  ventas: number;
  stock: number;
  montoTotal: number;
  foto: string;
}