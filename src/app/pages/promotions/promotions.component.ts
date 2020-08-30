import { Component, OnInit } from "@angular/core";
import { ProductoService } from "../../core/services/product/producto.service";
import { Products } from "../../core/interface/products";
import { NgxSpinnerService } from "ngx-spinner";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { Categoria } from "../../core/interface/categoria";
import { CategoriaService } from "../../core/services/categoria/categoria.service";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-promotions",
  templateUrl: "./promotions.component.html",
  styleUrls: ["./promotions.component.css"],
})
export class PromotionsComponent implements OnInit {
  private form: FormGroup;

  display: boolean = false;
  bandera: boolean = false;
  mensaje: boolean = false;

  imagen: any;
  productos: Products[];

  colsdata: Products[];

  categoria: string = "B9MwktyLd7z4onQIKKAw";

  Urls: any = [];

  allfiles: any = [];

  previewUrl: any = null;

  producSlide: any = [];

  cols = [
    { field: "nombre", header: "Nombre" },
    { field: "descripcion", header: "Descripcion" },
    { field: "categoria", header: "Categoria" },
    { field: "precio", header: "Precio" },
    { field: "stock", header: "Stock" },
    { field: "imagen", header: "Imagen" },
  ];

  message: any = {
    mensaje: "",
    accion: "",
  };

  constructor(
    private productosService: ProductoService,
    private formBuilder: FormBuilder,
    private caterogiasService: CategoriaService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.clearState();
    this.spinner.show();
    this.colsdata = [];
    this.productos = [];

    let subs = this.productosService.getProductos().subscribe(
      (data: any) => {
        this.productos = data;
        this.spinner.hide();
        //subs.unsubscribe();
      },
      (err: any) => {
        this.spinner.hide();
        subs.unsubscribe();
      }
    );
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

  showDialog(imagen: any) {
    this.display = true;
    this.imagen = imagen;
  }

  newPromotion() {
    this.bandera = true;
  }

  onFileUpload(event) {
    this.spinner.show();
    const files = event.files;
    this.fileProgress(files);
    this.spinner.hide();
  }

  fileProgress(file: any) {
    for (let i = 0; i < file.length; i++) {
      var mimeType = file[i].type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }

      this.allfiles.push(file[i]);
      const reader = new FileReader();
      reader.onload = (fileData) => {
        this.previewUrl = reader.result;
        this.Urls.push(this.previewUrl);
      };
      reader.readAsDataURL(file[i]);
    }
  }

  save() {
    this.addProduct();
  }

  eliminarProduct(producto: Products) {
    this.mensaje = true;

    this.message = {
      mensaje: "Se ha eliminado la promoción de la lista",
      accion: "Terminó la promoción!",
    };

    producto.isActivo = false;
    this.productosService.updateProduct(producto);
    this.clearState();
  }

  clearState() {
    this.display = false;
    this.previewUrl = null;
    this.Urls = [];
    this.form.reset();
  }

  addProduct() {
    this.bandera = false;

    let producto: Products = {
      descripcion: this.form.get("descripcion").value,
      foto: this.previewUrl,
      idCategoria: this.categoria,
      nombre: this.form.get("nombre").value,
      isActivo: true,
      precio: this.form.get("precio").value,
      stock: this.form.get("stock").value,
      slide: this.Urls,
    };

    this.mensaje = true;

    this.message = {
      mensaje: "Se ha agregado la promoción a la lista",
      accion: "Nueva Promoción!",
    };

    this.productosService
      .pushProductos(producto)
      .then((data: any) => {
        this.clearState();
      });
  }
}
