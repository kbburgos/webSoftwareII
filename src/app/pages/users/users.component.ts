import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UsersService } from 'app/core/services/user/users.service';
import { AuthService } from 'app/core/services/auth/auth.service';
import { environment } from 'environments/environment';

import { Usuarios } from 'app/core/interface/Usuarios';
import { Rol } from 'app/core/interface/rol';
import { UserInfoService } from 'app/core/services/userInfo/user-info.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioInterface } from 'app/core/interface/usuario-interface';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { UserRol } from 'app/core/interface/user-rol';

@Component({
  selector: 'app-promotions',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [MessageService],
})
export class UsersComponent implements OnInit {
  form: FormGroup;
  token: any = this.auth.getJwtToken();
  usuarios: UserRol[];
  temp: any[] = [];
  column: Usuarios[];
  display = false;
  rolName: String = 'Rol';
  datosUsuario: UsuarioInterface;
  data: any = '';
  rol = 0;
  edit = false;
  UsuarioEdit: UsersService;

  cols = [
    { field: 'cedula', header: 'CÉDULA' },
    { field: 'nombre', header: 'NOMBRES' },
    { field: 'rol', header: 'ROL' },
    { field: 'email', header: 'EMAIL' },
    { field: 'direccion', header: 'DIRECCIÓN' },
    { field: 'telefono', header: 'TELÉFONO' },
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
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.clearState();
    this.cargar();
  }

  cargar() {
    this.spinner.show();
    const subs = this.user.usuarios().subscribe(
      (data: any) => {
        console.log(data);
        this.usuarios = this.filtrado(data);
        this.spinner.hide();
      },
      (err: any) => {
        console.log(err);
        this.spinner.hide();
        subs.unsubscribe();
        this.showMessage('Error al cargar los usuarios', 'error', 'Error!');
      }
    );
  }

  filtrado(coleccion) {
    const temporal: any[] = [];
    coleccion.map((item) => {
      if (item.rol == 1) {
        item.rol = 'Admin';
        temporal.push(item);
      } else if (item.rol == 2) {
        item.rol = 'Vend';
        temporal.push(item);
      }
    });
    this.data = coleccion;
    return temporal;
  }

  /*tableColumns(colection) {
    colection.map((usuario) => {
      let User: Usuarios = {
        apellido: usuario.apellido,
        cedula: usuario.cedula,
        contrasenia: usuario.contrasenia,
        direccion: usuario.direccion,
        email: usuario.email,
        nombre: usuario.nombre,
        rol: usuario.rol,
        telefono: usuario.telefono,
      };
      this.temp.push(User);
      this.column = this.temp;
      this.spinner.hide();
    });
  }*/

  buildForm() {
    this.form = this.formBuilder.group({
      cedula: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern(environment.emailPatter),
      ]),
      direccion: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  newUser() {
    this.display = true;
  }

  save() {
    console.log('entra a save');
    this.data = '';
    // let clave = String(Math.random() * (999999999 - 111111111) + 111111111);
    this.datosUsuario = {
      cedula: this.form.get('cedula').value,
      nombre: this.form.get('nombre').value,
      apellido: this.form.get('apellido').value,
      telefono: this.form.get('telefono').value,
      email: this.form.get('email').value,
      contrasenia: 'contrasenia',
      rol: this.rol,
      direccion: this.form.get('direccion').value,
    };

    this.user
      .guardarUser(this.datosUsuario)
      .toPromise()
      .then((data: any) => {
        console.log('Parece que si');
        this.display = false;
        this.cargar();
        this.showMessage('Usuario creado exitósamente', 'success', 'Agregado!');
      })
      .catch((err) => {
        console.log(err);
        this.showMessage('Error al agregar el usuario', 'error', 'Error!');
      });
  }

  clearState() {
    this.display = false;
    this.form.reset();
  }

  guardarRol(rol: Number) {
    if (rol == 1) {
      this.rolName = 'Administrador';
      this.rol = 1;
    } else {
      this.rolName = 'Vendedor';
      this.rol = 2;
    }
  }

  abrirEditar(user) {
    console.log('LLEGAS');
    this.edit = true;
    this.UsuarioEdit = user;
    this.rol = 1;
    console.log(this.UsuarioEdit);
  }

  // TIENE FALLAS
  guardarCambios() {
    this.datosUsuario = {
      cedula: this.form.get('cedula').value,
      nombre: this.form.get('nombre').value,
      apellido: this.form.get('apellido').value,
      telefono: this.form.get('telefono').value,
      email: this.form.get('email').value,
      direccion: this.form.get('direccion').value,
      contrasenia: 'contrasenia',
      rol: this.rol,
    };
    //console.log(this.datosUsuario);
    this.user
      .setUserInfo(this.datosUsuario)
      .toPromise()
      .then((data) => {
        console.log('ingresado correctamente');
      })
      .catch((err) => {
        console.log(err);
        this.edit = false;
      });
  }

  EliminarUser(cedula: string) {
    this.data = '';
    this.user
      .deleteUser(cedula)
      .toPromise()
      .then((data) => {
        console.log('here we comes ');
        this.cargar();
        this.showMessage(
          'Usuario eliminado exitósamente',
          'success',
          'Eliminado!'
        );
      })
      .catch((err) => {
        console.log(err);
        this.showMessage('Error al eliminar el usuario', 'error', 'Error!');
      });
  }

  public getError(controlName: string): string {
    let field: string;
    // console.log(this.form.controls);
    const control = this.form.get(controlName);
    if ((control.touched || control.dirty) && control.errors != null) {
      if (control.errors.required != null) {
        field = controlName;
        if (controlName === 'nombre') {
          field = 'Nombre';
        } else if (controlName === 'telefono') {
          field = 'Teléfono';
        } else if (controlName === 'email') {
          field = 'Email';
        } else if (controlName === 'direccion') {
          field = 'Dirección';
        } else if (controlName === 'cedula') {
          field = 'Cédula';
        } else if (controlName === 'apellido') {
          field = 'Apellido';
        }
        return 'El campo ' + field + ' es requerido.';
      }
      if (control.errors.pattern != null) {
        if (controlName === 'telefono') {
          field = 'Teléfono';
        } else if (controlName === 'email') {
          field = 'Email';
        } else if (controlName === 'cedula') {
          field = 'Cédula';
        }
        return 'Ingrese un ' + field + ' válido';
      }
    }
    return '';
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
      message: '¿Est&aacute; seguro que deseas eliminar el usuario?',
      accept: () => {
        this.EliminarUser(cedula);
      },
    });
  }
}
