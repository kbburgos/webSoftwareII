import { Component, OnInit} from '@angular/core';
import { Usuarios } from '../../resource/interface/Usuarios'
import { environment } from '../../../environments/environment'


@Component({
  selector: 'app-promotions',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usuarios: Usuarios[];
  cols: any[]
  
  constructor() { }

  ngOnInit() {
    console.log(environment.variables.usuariosSistema)
    this.usuarios= environment.variables.usuariosSistema
    console.log(this.usuarios)
  }



 

}
