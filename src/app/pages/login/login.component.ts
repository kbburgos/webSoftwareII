import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { AuthService } from "app/core/services/auth/auth.service";
import { environment } from "../../../environments/environment";
import { UserInfoService } from "app/core/services/userInfo/user-info.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  isSubmitted = false;
  currentPopover = null;

  emailUser: string;
  password: string;
  user: any = {};
  showPassword = false;
  passwordToogleIcon = "eye-sharp";

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private userInfo: UserInfoService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ingresar() {

    
    console.log("ENTRA A LOGIN")
    const value = this.form.value;
    this.emailUser = value.phoneField;
    this.password = value.passwordField;

    if (this.form.valid) {
      this.auth
        .loginToApi(this.form.value.email, this.form.value.pass)
        .toPromise()
        .then((dt: any) => {
          this.auth.dataUser = dt.data;
          this.auth.token = {
            refreshToken: dt.refreshToken,
            token: dt.token,
          };
          console.log("estas en login ",dt)
          console.log("aqui aqui ", dt.token);
          this.auth.doLoginUser(this.auth.token)
          this.auth.isAuth = true;
          this.userInfo.email = dt.data.email;
          this.userInfo.cedula = dt.data.cedula;
          this.userInfo.usuario = dt.data.nombre + " " + dt.data.apellido;
          this.userInfo.telefono = dt.data.telefono;
          this.userInfo.direccion = dt.data.direccion;
          this.router.navigateByUrl("dashboard");
        })
        .catch((err) => {
          console.log(err);
          this.auth.logout();
        });
    }
  }

  onResetForm() {
    this.form.reset();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: new FormControl("", [Validators.required]),
      pass: new FormControl("", [Validators.required]),
    });
  }
}
