import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-report-news',
  templateUrl: './report-news.component.html',
  styleUrls: ['./report-news.component.css']
})
export class ReportNewsComponent implements OnInit {
  listreportnews: UsersReportNews[];
  cols: any[];
  constructor() { }

  ngOnInit() {
    this.listreportnews=[
      {codigo: 10, cliente: 'Walter Mendez', fecha: '28/06/2020', detalle: 'Detalle 1'},
      {codigo: 12, cliente: 'Francisco Garcia', fecha: '28/06/2020', detalle: 'Detalle 2'},
    ];
    this.cols=[
      {field: 'codigo', header: 'CODIGO'},
      {field: 'cliente', header: 'CLIENTE'},
      {field: 'fecha', header: 'FECHA'},
      {field: 'detalle', header: 'DETALLE'},
    ];
  }

}

export interface UsersReportNews {
  codigo: number;
  cliente: string;
  fecha: string;
  detalle: string;
}