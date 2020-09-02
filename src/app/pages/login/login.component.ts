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
import { AngularFireAuth } from "@angular/fire/auth";
import { async } from "@angular/core/testing";
import { UsersService } from "app/core/services/user/users.service";
import { UsuarioInterface } from "app/core/interface/usuario-interface"
import { MessageService } from "primeng/api";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [MessageService],
})

/**
 * This class contains all the login methods
 */
export class LoginComponent implements OnInit {
  isSubmitted = false;
  currentPopover = null;
  emailUser: string;
  datosUsuario: UsuarioInterface;
  password: string;
  contrasenio: boolean = false;
  user: any = {};
  showPassword = false;
  passwordToogleIcon = "eye-sharp";
  display: boolean = false;
  form: FormGroup;
  formContrasenia: FormGroup;
  notFound: boolean = false;
  usuario: any;
  emailcontra:any

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private userInfo: UserInfoService,
    private spinner: NgxSpinnerService,
    public afAuth: AngularFireAuth,
    private userS: UsersService,
    private messageService: MessageService,
  ) {
    this.display = false;
  }

  ngOnInit(): void {
    this.display = false;
    this.notFound = false;
    this.buildForm();
    this.buildForm2();
  }

  cargar() {
    const subs = this.userS.usuarios().subscribe(
      (data: any) => {
        this.usuario = this.filtrado(data);
      },
      (err: any) => {
        console.log(err);
        subs.unsubscribe();
      }
    );
  }

  filtrado(coleccion) {
    const temporal: any[] = [];
    coleccion.map((item) => {
      if (item.email == this.emailUser) {
        temporal.push(item);
        this.emailcontra=item.email
        console.log("usuario logueado ", item);
      }
    });
    return temporal;
  }

  /**
   * This method valid the user credential on the login.
   * @param email the email of the user
   * @param password the password of the user
   * @returns JSON whit the user information
   * @author Karla Burgos <kbburgos@espol.edu.ec>
   */

  verContrasenia() {
    console.log("cerra");
    this.contrasenio = true;
  }

  clearState() {
    this.contrasenio = false;
    this.form.reset();
  }

  enviarEmail() {
    this.password= this.formContrasenia.get("password").value
    console.log("contrasenia ", this.password)
    this.guardarCambios()
    this.auth.sendPasswordResetEmail(this.emailUser).then(data=>{
      this.showMessage("Ahora tendrás que confirmar tu contraseña", "success", "Confirma!");
    });
  }

  guardarCambios() {
    this.datosUsuario = {
      cedula: this.usuario.cedula,
      nombre: this.usuario.nombre,
      apellido: this.usuario.apellido,
      telefono: this.usuario.telefono,
      email: this.usuario.email,
      direccion: this.usuario.direccion,
      contrasenia: this.password,
      rol: this.usuario.rol,
    };
    this.userS
      .setUserInfo(this.datosUsuario)
      .toPromise()
      .then((data) => {
        this.contrasenio = false;
      })
      .catch((err) => {
        console.log(err);
        this.contrasenio = false;
      });
  }

  async ingresar() {
    this.contrasenio = false;
    this.spinner.show();
    const value = this.form.value;
    this.emailUser = value.email;
    this.password = value.pass;
    this.cargar();
    /*await this.auth
      .loginToFirebase(this.emailUser, this.password)
      .then(async (data: any) => {
        if (data && this.form.valid) {
          this.display = false;
          this.notFound = false;*/
          await this.auth
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
                this.auth.doLoginUser(
                  this.auth.token,
                  dt.data.cedula,
                  dt.data.rol
                );
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
            });/*
        }
      })
      .catch((err) => {
        this.notFound = true;
        this.spinner.hide();
        console.log(err);
        this.auth.logout();
      });*/
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

  private buildForm2() {
    this.formContrasenia = this.formBuilder.group({
      password: new FormControl("", [Validators.required]),
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

  showMessage(mensaje: string, tipo: string, titulo: string) {
    this.messageService.add({
      severity: tipo,
      summary: titulo,
      detail: mensaje,
      life: 4000,
    });
  }
}
