import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface ReportNewsUsers {
  codigo: number;
  cliente: string;
  fecha: string;
  detalle: string;
}

const NEWS_DATA: ReportNewsUsers[] = [
  {codigo: 10, cliente: 'Walter Mendez', fecha: '28/06/2020', detalle: 'Detalle 1'},
  {codigo: 12, cliente: 'Francisco Garcia', fecha: '28/06/2020', detalle: 'Detalle 2'},
];

@Component({
  selector: 'app-report-news',
  templateUrl: './report-news.component.html',
  styleUrls: ['./report-news.component.css']
})
export class ReportNewsComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'cliente', 'fecha', 'detalle', 'acciones'];
  dataSource = new MatTableDataSource(NEWS_DATA);
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
