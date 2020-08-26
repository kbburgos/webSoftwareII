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
//import { Categoria } from "../../resource/interface/categoria";
import { CategoriaService } from "../../core/services/categoria/categoria.service";
//import { PromotionNewComponent } from "../promotion-new/promotion-new.component";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";

@Component({
  selector: "app-current-promotion",
  templateUrl: "./current-promotion.component.html",
  styleUrls: ["./current-promotion.component.css"],
  providers: [MessageService],
})
export class CurrentPromotionComponent implements OnInit {
  private form: FormGroup;

  display: boolean = false;
  bandera: boolean = false;
  mensaje: boolean = false;
  slide: boolean = false;

  ProductEdit: Products;

  imagen: any;
  productos: Products[];

  colsdata: Products[];

  categoria: string = "B9MwktyLd7z4onQIKKAw";

  Urls: any = [];

  allfiles: any = [];

  previewUrl: any = null;

  producSlide: any = [];
  data: any = "";

  cols = [
    { field: "nombre", header: "Nombre" },
    { field: "descripcion", header: "Descripcion" },
    { field: "precio", header: "Precio" },
    { field: "stock", header: "Stock" },
  ];

  constructor(
    private productosService: ProductoService,
    private formBuilder: FormBuilder,
    private caterogiasService: CategoriaService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.clearState();
    this.colsdata = [];
    this.productos = [];

    this.cargar();
  }

  cargar() {
    this.spinner.show();
    let pro = this.productosService.getProductos().subscribe(
      (item: any) => {
        console.log(item);
        this.filtrado(item);
      },
      (err: any) => {
        console.log(err);
        this.spinner.hide();
        pro.unsubscribe();
        this.showMessage("Error al cargar las promociones", "error", "Error!");
      }
    );
  }

  filtrado(coleccion) {
    let temporal: any[] = [];
    coleccion.map((item) => {
      if (item.idCategoria == "B9MwktyLd7z4onQIKKAw" && item.isActivo) {
        temporal.push(item);
      }
    });
    this.data = coleccion;
    this.productos = temporal;
    this.spinner.hide();
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

  showDialogProduct(productos) {
    this.display = true;
    this.ProductEdit = Object.assign({}, productos);
  }

  confirmar() {
    let producto: Products = {
      idProducto: this.ProductEdit.idProducto,
      descripcion: this.ProductEdit.descripcion,
      foto: this.ProductEdit.foto,
      idCategoria: this.categoria,
      nombre: this.ProductEdit.nombre,
      isActivo: true,
      precio: this.ProductEdit.precio,
      stock: this.ProductEdit.stock,
      slide: this.ProductEdit.slide,
    };

    this.confirmationService.confirm({
      message: "¿Est&aacute; seguro que desea editar la promoción?",
      accept: () => {
        console;
        this.update(producto),
          (err: any) => {
            console.log(err);
            this.showMessage("Error al editar la promoción", "error", "Error!");
          };
        this.display = false;
        this.clearState();
      },
    });
  }

  confirmarEliminar(producto: Products) {
    this.confirmationService.confirm({
      message: "¿Est&aacute; seguro que deseas eliminar la promoción?",
      accept: () => {
        this.eliminarProduct(producto),
          (err: any) => {
            console.log(err);
            this.showMessage(
              "Error al eliminar la promoción",
              "error",
              "Error!"
            );
          };
      },
    });
  }

  update(producto: Products) {
    producto.idCategoria = this.categoria;
    this.productosService.updateProduct(producto),
      (err: any) => {
        console.log(err);
        this.showMessage("Error al editar la promoción", "error", "Error!");
      };
    this.clearState();
    this.showMessage("Promoción activa", "success", "Activa!");
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
      console.log(file[i]);
      const reader = new FileReader();
      (reader.onload = (fileData) => {
        this.previewUrl = reader.result;
        //this.imageUp=false
        this.Urls.push(this.previewUrl);
      }),
        (err: any) => {
          console.log(err);
          this.showMessage("Error al cargar las imágenes", "error", "Error!");
        };
      reader.readAsDataURL(file[i]);
    }
  }

  save() {
    this.addProduct();
  }

  eliminarProduct(producto: Products) {
    console.log(producto);
    producto.isActivo = false;
    this.productosService.updateProduct(producto),
      (err: any) => {
        console.log(err);
        this.showMessage("Error al eliminar la promoción", "error", "Error!");
      };
    this.showMessage("Promoción inactiva", "success", "Inactiva!");
    this.clearState();
  }

  clearState() {
    this.display = false;
    this.previewUrl = null;
    this.Urls = [];
    this.form.reset();
  }

  addProduct() {
    console.log(this.categoria);

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

    this.productosService
      .pushProductos(producto)
      .then((data: any) => {
        console.log("Guardado");
        this.display = false;
        this.bandera = false;
        this.clearState();
        this.showMessage(
          "Promoción creado exitósamente",
          "success",
          "Agregado!"
        );
      })
      .catch((err: any) => {
        this.bandera = false;
        this.showMessage("Error al crear la promoción", "error", "Error!");
        console.log(err);
      });
  }

  showSlide(producto: any[]) {
    this.producSlide = producto;
    this.slide = true;
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
