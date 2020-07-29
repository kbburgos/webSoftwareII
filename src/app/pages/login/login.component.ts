import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { AuthService } from "app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.buildForm();
  }

 ingresar() {

    if(this.form.valid){      
      this.auth.login(this.form.value.email, this.form.value.pass);
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: new FormControl("", [Validators.required]),
      pass: new FormControl("", [Validators.required]),
    });
  }
}
