import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-promotions',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  display: boolean = false;
  listusers: Users[];
  cols: any[];
  constructor() { }

  ngOnInit() {
    this.listusers=[
      {nombre: 'Luciana', apellido: 'Gamboa', correo: 'lucianaGamboa@hotmail.com', telefono: '0984625896', rol: 'Administrador'},
    ];
    this.cols=[
      {field: 'nombre', header: 'NOMBRE'},
      {field: 'apellido', header: 'APELLIDOS'},
      {field: 'correo', header: 'CORREO'},
      {field: 'telefono', header: 'TELEFONO'},
      {field: 'rol', header: 'ROL'},
    ];
  }

  showDialogUsers() {
    this.display = true;
  }

}

export interface Users {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  rol: string;
}