import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface ReporteProducto {
  producto: string;
  ventas: number;
  stock: number;
  montoTotal: number;
  foto: string;
}

const PRODUCTO_DATA: ReporteProducto[] = [
  {producto: 'Batido de fresa', ventas: 50, stock: 100, montoTotal: 90, foto: ''},
  {producto: 'Espresso', ventas: 80, stock: 250, montoTotal: 120, foto: ''},
  {producto: 'Capuchino', ventas: 30, stock: 300, montoTotal: 70, foto: ''},
  {producto: 'Crepa', ventas: 10, stock: 150, montoTotal: 50, foto: ''},
  {producto: 'Donas', ventas: 70, stock: 130, montoTotal: 115, foto: ''},
  {producto: 'Cupcakes', ventas: 48, stock: 80, montoTotal: 60, foto: ''},
];

@Component({
  selector: 'app-report-product',
  templateUrl: './report-product.component.html',
  styleUrls: ['./report-product.component.css']
})
export class ReportProductComponent  implements OnInit {
  displayedColumns: string[] = ['producto', 'ventas', 'stock', 'montoTotal', 'foto'];
  dataSource = new MatTableDataSource(PRODUCTO_DATA);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}
