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
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})

/**
 * @classdesc Container class of LoginComponent.
 * @desc Creation Date: 08/20/2020
 * @class
 * @public
 * @version 2.0.0
 * @author Karla Burgos <kbburgos@espol.edu.ec>
 */
export class LoginComponent implements OnInit {
  isSubmitted = false;
  currentPopover = null;
  emailUser: string;
  password: string;
  user: any = {};
  showPassword = false;
  passwordToogleIcon = "eye-sharp";
  display: boolean = false;
  form: FormGroup;
  notFound: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private userInfo: UserInfoService,
    private spinner: NgxSpinnerService
  ) {
    this.display = false;
  }

  ngOnInit(): void {
    this.display = false;
    this.notFound = false;
    this.buildForm();
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for user authentication. <br> Creation Date: 08/20/2020
   * @type {Promise<void>} Void type promise.
   * @returns {JSON} JSON user
   * @author Karla Burgos <kbburgos@espol.edu.ec>
  */

  ingresar() {
    this.spinner.show();
    console.log("ENTRA A LOGIN");
    const value = this.form.value;
    this.emailUser = value.phoneField;
    this.password = value.passwordField;

    if (this.form.valid) {
      this.auth
        .loginToApi(this.form.value.email, this.form.value.pass)
        .toPromise()
        .then((dt: any) => {
          if (dt.data.rol != 3) {
            this.spinner.hide();
            this.auth.dataUser = dt.data;
            this.auth.token = {
              refreshToken: dt.refreshToken,
              token: dt.token,
            };

            //    console.log("estas en login ", dt);
            //    console.log("aqui aqui ", dt.token);
            this.auth.doLoginUser(this.auth.token, dt.data.cedula);

            this.auth.isAuth = true;
            this.userInfo.email = dt.data.email;
            this.userInfo.cedula = dt.data.cedula;
            this.userInfo.usuario = dt.data.nombre + " " + dt.data.apellido;
            this.userInfo.telefono = dt.data.telefono;
            this.userInfo.direccion = dt.data.direccion;
            this.userInfo.rol = dt.data.rol;

            environment.usuario.cedula = dt.data.cedula;
            environment.usuario.email = dt.data.email;
            environment.usuario.rol = dt.data.rol;

            this.router.navigateByUrl("dashboard");
          } else {
            this.spinner.hide();
            console.log("NO ESTAS AUTORIZADO");
            this.display = true;
            this.onResetForm();
          }
        })
        .catch((err) => {
          this.notFound = true;
          this.spinner.hide();
          console.log(err);
          this.auth.logout();
        });
    }
  }

  onResetForm() {
    this.form.reset();
  }

  private buildForm() {
    this.display = false;
    this.form = this.formBuilder.group({
      email: new FormControl("", [Validators.required]),
      pass: new FormControl("", [Validators.required]),
    });
  }



  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for valid the form fields. <br> Creation Date: 08/20/2020
   * @type {Promise<void>} Void type promise.
   * @returns {string} string field
   * @author Karla Burgos <kbburgos@espol.edu.ec>
  */

  public getError(controlName: string): string {
    const control = this.form.get(controlName);
    let field;
    if ((control.touched || control.dirty) && control.errors != null) {
      if (control.errors.required != null) {
        field = controlName;
        if (controlName === "email") {
          field = "correo electrónico";
        } else if (controlName === "pass") {
          field = "contraseña";
        }
        return "El campo " + field + " es requerido.";
      }
    }
    return "";
  }
}
