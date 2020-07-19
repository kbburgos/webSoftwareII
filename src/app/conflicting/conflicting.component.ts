import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-promotions',
  templateUrl: './conflicting.component.html',
  styleUrls: ['./conflicting.component.css']
})
export class ConflictingComponent implements OnInit {
  display: boolean = false;
  listconflicting: Conflicting[];
  cols: any[];
  constructor() { }

  ngOnInit() {
    this.listconflicting=[
      {nombre: 'Ramiro', apellido: 'Zambrano', correo: 'ramiroZambrano@hotmail.com', telefono: '0974547852'},
    ];
    this.cols=[
      {field: 'nombre', header: 'NOMBRE'},
      {field: 'apellido', header: 'APELLIDOS'},
      {field: 'correo', header: 'CORREO'},
      {field: 'telefono', header: 'TELEFONO'},
    ];
  }

  showDialogConflicting() {
    this.display = true;
  }

}

export interface Conflicting {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
}