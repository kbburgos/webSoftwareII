import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UsersService } from "app/core/services/user/users.service";
import { AuthService } from "app/core/services/auth/auth.service";
import { environment } from "environments/environment";
import { Usuarios } from "app/core/interface/Usuarios";
import { UserInfoService } from "app/core/services/userInfo/user-info.service";
import { NgxSpinnerService } from "ngx-spinner";
import { UsuarioInterface } from "app/core/interface/usuario-interface";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { SeguridadService } from "app/core/services/seguridad.service";
import { UserRol } from "app/core/interface/user-rol";

@Component({
  selector: "app-promotions",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
  providers: [MessageService],
})

/**
 * @classdesc Container class of UsersComponent.
 * @desc Creation Date: 08/20/2020
 * @class
 * @public
 * @version 2.0.0
 * @author Karla Burgos <kbburgos@espol.edu.ec>
 */
export class UsersComponent implements OnInit {
  form: FormGroup;
  token: any = this.auth.getJwtToken();
  usuarios: UserRol[];
  temp: any[] = [];
  column: Usuarios[];
  display = false;
  rolName: String = "Rol";
  datosUsuario: UsuarioInterface;
  data: any = "";
  rol = 0;
  edit = false;
  UsuarioEdit: UsersService;
  pass: any = "";

  cols = [
    { field: "cedula", header: "CÉDULA" },
    { field: "nombre", header: "NOMBRES" },
    { field: "rol", header: "ROL" },
    { field: "email", header: "EMAIL" },
    { field: "direccion", header: "DIRECCIÓN" },
    { field: "telefono", header: "TELÉFONO" },
  ];

  constructor(
    private http: HttpClient,
    private user: UsersService,
    private auth: AuthService,
    private authService: AuthService,
    private userInfo: UserInfoService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public afAuth: AngularFireAuth,
    private seguridad: SeguridadService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.clearState();
    this.cargar();
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for loading user information from API. <br> Creation Date: 08/20/2020
   * @type {Promise<void>} Void type promise.
   * @returns {JSON} JSON users
   * @author Karla Burgos <kbburgos@espol.edu.ec>
   */

  cargar() {
    this.spinner.show();
    const subs = this.user.usuarios().subscribe(
      (data: any) => {
        this.usuarios = this.filtrado(data);
        console.log("usuarios ", data);
        this.spinner.hide();
      },
      (err: any) => {
        console.log(err);
        this.spinner.hide();
        subs.unsubscribe();
        this.showMessage("Error al cargar los usuarios", "error", "Error!");
      }
    );
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for filter the user and their roles. <br> Creation Date: 08/20/2020
   * @type {Promise<void>} Void type promise.
   * @returns {JSON} JSON users
   * @author Karla Burgos <kbburgos@espol.edu.ec>
   */

  filtrado(coleccion) {
    const temporal: any[] = [];
    coleccion.map((item) => {
      if (item.nombre != "repartidor") {
        if (item.rol == 1) {
          item.rol = "Admin";
          temporal.push(item);
        } else if (item.rol == 2) {
          item.rol = "Vend";
          temporal.push(item);
        }
      }
    });
    this.data = coleccion;
    return temporal;
  }

  buildForm() {
    this.form = this.formBuilder.group({
      cedula: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
      nombre: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
      apellido: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern(environment.emailPatter),
      ]),
      direccion: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
      telefono: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  newUser() {
    this.display = true;
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for add an user to the relational database. <br> Creation Date: 08/20/2020
   * @type {Promise<void>} Void type promise.
   * @returns {JSON} JSON users
   * @author Karla Burgos <kbburgos@espol.edu.ec>
   */
  save() {
    this.data = "";
    this.datosUsuario = {
      cedula: this.form.get("cedula").value,
      nombre: this.form.get("nombre").value,
      apellido: this.form.get("apellido").value,
      telefono: this.form.get("telefono").value,
      email: this.form.get("email").value,
      contrasenia: "contrasenia",
      rol: this.rol,
      direccion: this.form.get("direccion").value,
    };

    this.user
      .guardarUser(this.datosUsuario)
      .toPromise()
      .then((data: any) => {
        this.display = false;
        this.cargar();
        this.register(this.datosUsuario.email, this.datosUsuario.contrasenia);
        this.showMessage("Usuario creado exitósamente", "success", "Agregado!");
      })
      .catch((err) => {
        console.log(err);
        this.showMessage("Error al crear el usuario", "error", "Error!");
      });
  }

  async register(email: string, password: string) {
    var result = await this.afAuth.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    console.log(result);
  }

  clearState() {
    this.display = false;
    this.form.reset();
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for filter the user roles. <br> Creation Date: 08/20/2020
   * @returns {String} string rol
   * @author Karla Burgos <kbburgos@espol.edu.ec>
   */

  guardarRol(rol: Number) {
    if (rol == 1) {
      this.rolName = "Administrador";
      this.rol = 1;
    }
    if (rol == 2) {
      this.rolName = "Vendedor";
      this.rol = 2;
    }
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is gets the confirmation by the client to edit an user information. <br> Creation Date: 08/20/2020
   * @type {Promise<void>} Void type promise.
   * @returns {JSON} JSON users
   * @author Karla Burgos <kbburgos@espol.edu.ec>
   */
  confirmar() {
    this.confirmationService.confirm({
      message: "¿Est&aacute; seguro que deseas editar el usuario?",
      accept: () => {
        console;
        this.guardarCambios(),
          (err: any) => {
            console.log(err);
            this.showMessage("Error al editar el usuario", "error", "Error!");
          };
        this.edit = false;
        this.clearState();
      },
    });
  }

  abrirEditar(user) {
    this.pass = user.contrasenia;
    console.log("Este es el usuario ", user);
    console.log("Esta es la contrasenia ", user.contrasenia);
    console.log("Esta es la contrasenia ", this.seguridad.desencriptar(user.contrasenia));
    this.edit = true;
    if (user.rol == "Admin") {
      this.rol = 1;
    } else {
      this.rol = 2;
    }
    this.UsuarioEdit = Object.assign({}, user);
    this.rolName = user.rol;
  }

  findUserId(cedula: string) {
    this.user
      .userById(cedula)
      .toPromise()
      .then((data) => {
        console.log("este es el usaurio ", data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method send a request to update an user information. <br> Creation Date: 08/20/2020
   * @type {Promise<void>} Void type promise.
   * @returns {JSON} JSON users
   * @author Karla Burgos <kbburgos@espol.edu.ec>
   */

  guardarCambios() {
    this.data = "";
    this.datosUsuario = {
      cedula: this.form.get("cedula").value,
      nombre: this.form.get("nombre").value,
      apellido: this.form.get("apellido").value,
      telefono: this.form.get("telefono").value,
      email: this.form.get("email").value,
      direccion: this.form.get("direccion").value,
      contrasenia: this.pass,
      rol: this.rol,
    };
    this.user
      .setUserInfo(this.datosUsuario)
      .toPromise()
      .then((data) => {
        console.log("ingresado correctamente");
        this.cargar();
        this.edit = false;
        this.showMessage("Usuario editado exitósamente", "success", "Editado!");
      })
      .catch((err) => {
        console.log(err);
        this.edit = false;
        this.showMessage("Error al editar el usuario", "error", "Error!");
      });
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method delete an user from the database. <br> Creation Date: 08/20/2020
   * @type {Promise<void>} Void type promise.
   * @returns {JSON} JSON users
   * @author Karla Burgos <kbburgos@espol.edu.ec>
   */

  EliminarUser(cedula: string) {
    this.data = "";
    this.user
      .deleteUser(cedula)
      .toPromise()
      .then((data) => {
        this.cargar();
        this.showMessage(
          "Usuario eliminado exitósamente",
          "success",
          "Eliminado!"
        );
      })
      .catch((err) => {
        console.log(err);
        this.showMessage("Error al eliminar el usuario", "error", "Error!");
      });
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method gets the forms fields validation. <br> Creation Date: 08/20/2020
   * @returns {string} string form invalid field
   * @author Karla Burgos <kbburgos@espol.edu.ec>
   */
  public getError(controlName: string): string {
    let field: string;
    const control = this.form.get(controlName);
    if ((control.touched || control.dirty) && control.errors != null) {
      if (control.errors.required != null) {
        field = controlName;
        if (controlName === "nombre") {
          field = "Nombre";
        } else if (controlName === "telefono") {
          field = "Teléfono";
        } else if (controlName === "email") {
          field = "Email";
        } else if (controlName === "direccion") {
          field = "Dirección";
        } else if (controlName === "cedula") {
          field = "Cédula";
        } else if (controlName === "apellido") {
          field = "Apellido";
        }
        return "El campo " + field + " es requerido.";
      }
      if (control.errors.pattern != null) {
        if (controlName === "telefono") {
          field = "Teléfono";
        } else if (controlName === "email") {
          field = "Email";
        } else if (controlName === "cedula") {
          field = "Cédula";
        }
        return "Ingrese un " + field + " válido";
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

  confirmarEliminar(cedula: string) {
    this.confirmationService.confirm({
      message: "¿Est&aacute; seguro que deseas eliminar el usuario?",
      accept: () => {
        this.EliminarUser(cedula);
      },
    });
  }
}
