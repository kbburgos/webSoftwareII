import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface ListaEnEspera {
  codigo: number;
  cliente: string;
  entrega: string;
  fecha: string;
  monto: number;
}

const ESPERA_DATA: ListaEnEspera[] = [
  {codigo: 1, cliente: 'Carlos Mendez', entrega: 'domicilio', fecha: '28/06/2020', monto: 5.00},
  {codigo: 2, cliente: 'Lucia Meza', entrega: 'domicilio', fecha: '28/06/2020', monto: 15.48},
  {codigo: 3, cliente: 'Marco Solis', entrega: 'domicilio', fecha: '28/06/2020', monto: 12.45},
  {codigo: 4, cliente: 'Juan Naraez', entrega: 'domicilio', fecha: '28/06/2020', monto: 6.50},
  {codigo: 5, cliente: 'Byron Perez', entrega: 'domicilio', fecha: '28/06/2020', monto: 7.00},
  {codigo: 6, cliente: 'Dayanna Velez', entrega: 'domicilio', fecha: '28/06/2020', monto: 9.00},
];

@Component({
  selector: 'app-en-espera',
  templateUrl: './en-espera.component.html',
  styleUrls: ['./en-espera.component.css']
})
export class EnEsperaComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'cliente', 'entrega', 'fecha', 'monto', 'acciones'];
  dataSource = new MatTableDataSource(ESPERA_DATA);
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
