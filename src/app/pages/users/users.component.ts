import { Component, OnInit} from '@angular/core';
import { Usuarios } from '../../resource/interface/Usuarios'
import { HttpClient } from '@angular/common/http';

import { UsersService } from "../../services/users.service";
import { AuthService } from "../../services/auth.service";
import { environment } from "environments/environment";

@Component({
  selector: 'app-promotions',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  token:any;
  listusuarios: Usuarios[];
  cols: any[]
  
  constructor(
    private http: HttpClient,
    private userList: UsersService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.token = this.authService.getJwtToken();
    this.userList.usuarios(this.token).subscribe((data: any) => {
      this.listusuarios = data;
      console.log(this.listusuarios);
    });
  }

}
