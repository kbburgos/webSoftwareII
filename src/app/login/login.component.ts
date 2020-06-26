import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private ingresar() {
    this.router.navigateByUrl("/dashboard");
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: new FormControl("", [Validators.required]),
      pass: new FormControl("", [Validators.required]),
    });
  }
}
