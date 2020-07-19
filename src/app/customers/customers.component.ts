import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-promotions',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  display: boolean = false;
  listcustomers: Customers[];
  cols: any[];
  constructor() { }

  ngOnInit() {
    this.listcustomers=[
      {nombre: 'Fabiana', apellido: 'Gamboa', correo: 'fabianaGamboa@hotmail.com', telefono: '0984625896'},
      {nombre: 'Josefina', apellido: 'Lara', correo: 'josefinaLara@hotmail.com', telefono: '0978961548'},
      {nombre: 'Laura', apellido: 'Calero', correo: 'lauraCalero@hotmail.com', telefono: '0985214697'},
    ];
    this.cols=[
      {field: 'nombre', header: 'NOMBRE'},
      {field: 'apellido', header: 'APELLIDOS'},
      {field: 'correo', header: 'CORREO'},
      {field: 'telefono', header: 'TELEFONO'},
    ];
  }

  showDialogCustomers() {
    this.display = true;
  }

}

export interface Customers {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
}