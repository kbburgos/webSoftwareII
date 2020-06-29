import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface ReporteVentas {
  codigo: number;
  cliente: string;
  preferencia: string;
  fecha: string;
  monto: number;
}

const SALES_DATA: ReporteVentas [] = [
  {codigo: 1, cliente: 'Carlon Mendez', preferencia: 'Domicilio', fecha: '28/06/2020', monto: 5.00},
  {codigo: 2, cliente: 'Lucia Meza', preferencia: 'Local', fecha: '28/06/2020', monto: 15.48},
  {codigo: 3, cliente: 'Marco Solis', preferencia: 'Domicilio', fecha: '28/06/2020', monto: 12.45},
  {codigo: 4, cliente: 'Juan Naraez', preferencia: 'Domicilio', fecha: '28/06/2020', monto: 6.50},
  {codigo: 5, cliente: 'Byron Perez', preferencia: 'Local', fecha: '28/06/2020', monto: 7.00},
  {codigo: 6, cliente: 'Dayanna Velez', preferencia: 'Domicilio', fecha: '28/06/2020', monto: 9.00},
];

@Component({
  selector: 'app-report-sales',
  templateUrl: './report-sales.component.html',
  styleUrls: ['./report-sales.component.css']
})
export class ReportSalesComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'cliente', 'preferencia', 'fecha', 'monto', 'acciones'];
  dataSource = new MatTableDataSource(SALES_DATA);
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
