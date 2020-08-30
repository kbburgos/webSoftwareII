import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core/services/auth/auth.service'
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }


  



}
