import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-report-sales',
  templateUrl: './report-sales.component.html',
  styleUrls: ['./report-sales.component.css']
})
export class ReportSalesComponent implements OnInit {
  listreportsales: ReportSales[];
  cols: any[];
  constructor() { }

  ngOnInit() {
    this.listreportsales=[
      {codigo: 1, cliente: 'Carlon Mendez', preferencia: 'Domicilio', fecha: '28/06/2020', monto: 5.00},
      {codigo: 2, cliente: 'Lucia Meza', preferencia: 'Local', fecha: '28/06/2020', monto: 15.48},
      {codigo: 3, cliente: 'Marco Solis', preferencia: 'Domicilio', fecha: '28/06/2020', monto: 12.45},
      {codigo: 4, cliente: 'Juan Naraez', preferencia: 'Domicilio', fecha: '28/06/2020', monto: 6.50},
      {codigo: 5, cliente: 'Byron Perez', preferencia: 'Local', fecha: '28/06/2020', monto: 7.00},
      {codigo: 6, cliente: 'Dayanna Velez', preferencia: 'Domicilio', fecha: '28/06/2020', monto: 9.00},
    ];
    this.cols=[
      {field: 'codigo', header: 'CODIGO'},
      {field: 'cliente', header: 'CLIENTE'},
      {field: 'preferencia', header: 'PREFERENCIA'},
      {field: 'fecha', header: 'FECHA'},
      {field: 'monto', header: 'MONTO'},
    ];
  }

}

export interface ReportSales {
  codigo: number;
  cliente: string;
  preferencia: string;
  fecha: string;
  monto: number;
}