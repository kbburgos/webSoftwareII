import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ProductoService } from "../../services/producto.service";
import { Products } from "../../resource/interface/products";
import { CustomerNews } from "../../resource/interface/customerNews";
import { ConfirmationService } from "primeng/api";
import { HttpClientModule } from "@angular/common/http";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";

import { Categoria } from "../../resource/interface/categoria";
import { CategoriaService } from "../../services/categoria.service";
import { UserNotificationService } from "../../services/user-notification.service";
import { AuthService } from "../../services/auth.service";
import { environment } from "environments/environment";
import { data } from "jquery";

@Component({
  selector: "app-user-notification",
  templateUrl: "./user-notification.component.html",
  styleUrls: ["./user-notification.component.css"],
})
export class UserNotificationComponent implements OnInit {
  form: FormGroup;
  display: boolean = false;
  bandera: boolean = false;
  productos: Products[];
  categorias: Categoria[];

  token:any;

  cols: any[];

  editState: boolean = false;
  ProductEdit: Products;

  selectedFile: File = null;

  private categoria: string = 'Dulces';

  private fileData: File = null;
  previewUrl: any = null;

  listCustomerNews: CustomerNews[];

  constructor(
    private productosService: ProductoService,
    private confirmationService: ConfirmationService,
    private httpClient: HttpClientModule,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private categoriasService: CategoriaService,
    private userNotification: UserNotificationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    //  console.log("A VER QUE ONDIA");
    this.productos = [];
    //this.categorias = [];

    this.token = this.authService.getJwtToken();
    console.log(this.token);
    this.userNotification.clienteNotification(this.token).subscribe((data: any) => {
      this.listCustomerNews = data;
    });

    let sub = this.productosService.getProductos().subscribe((item: any) => {
      this.productos = item;
    });

    this.buildForm();
  }


  save() {
    console.log("ESTAMOS AQUI!!!");
    this.addProduct();
  }

  private fileProgress(fileInput: any) {
    this.fileData = <File>fileInput;
    this.preview();
  }

  private preview() {
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }

  onFileUpload(event) {
    this.fileProgress(event.target.files[0]);
  }

  showDialogProduct(productos) {
    this.display = true;
    this.ProductEdit = productos;
  }

  confirmarEditar() {
    this.confirmationService.confirm({
      message: "¿Est&aacute; seguro que desea editar el producto?",
      accept: () => {
        this.productosService.updateProduct(this.ProductEdit);
        this.clearState();
      },
    });
  }

  showAddDialog() {
    this.bandera = true;
  }

  addProduct() {
    let producto: Products = {
      descripcion: this.form.get("descripcion").value,
      foto: this.previewUrl,
      idCategoria: this.categoria,
      nombre: this.form.get("nombre").value,
      precio: this.form.get("precio").value,
      stock: this.form.get("stock").value,
      slide:[]
    };
    console.log(producto);

    this.productosService
      .pushProductos(producto)
      .then((data: any) => {
        this.bandera = false;
        console.log(data);
      })
      .catch((err: any) => {
        console.log(err);
      });
    this.clearState();
  }

  eliminarProduct(producto) {
    console.log(producto);
    this.productosService.deleteProduct(producto.idProducto);
    this.clearState();
  }

  clearState() {
    this.display = false;
    this.ProductEdit = null;
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      nombre: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
      descripcion: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
      precio: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
      stock: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  guardarCategoria(categoria: string) {
    this.categoria = categoria;
    console.log(this.categoria);
  }
}
