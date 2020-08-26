import { Component, OnInit } from "@angular/core";
import { ProductoService } from "app/core/services/product/producto.service";
import { Products } from "app/core/interface/products";
import { ConfirmationService } from "primeng/api";

import { NgxSpinnerService } from "ngx-spinner";

import { MessageService } from "primeng/api";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";

import { Categoria } from "../../core/interface/categoria";
import { CategoriaService } from "../../core/services/categoria/categoria.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
  providers: [MessageService],
})
export class ProductsComponent implements OnInit {
  form: FormGroup;
  display: boolean = false;
  bandera: boolean = false;
  slide: boolean = false;
  productos: Products[] = [];
  categorias: Categoria[] = [];
  ProductEdit: Products;
  categoria: string = "";
  catName: string = "Categoría";
  Urls: any = [];
  allfiles: any = [];
  previewUrl: any = null;
  producSlide: any = [];
  data: any = "";
  imageUp: boolean = true;

  cols: any = [
    { field: "nombre", header: "NOMBRE" },
    { field: "descripcion", header: "DESCRIPCIÓN" },
    { field: "categoria", header: "CATEGORÍA" },
    { field: "precio", header: "PRECIO" },
    { field: "stock", header: "STOCK" },
  ];

  constructor(
    private productosService: ProductoService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private caterogiasService: CategoriaService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.productos = [];

    let cat = this.caterogiasService.getCategorias().subscribe((item: any) => {
      this.categorias = item;
    });

    this.buildForm();
    this.clearState();
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
        this.showMessage("Error al cargar los productos", "error", "Error!");
      }
    );
  }

  filtrado(coleccion) {
    let temporal: any[] = [];
    coleccion.map((item) => {
      this.categorias.map((cat) => {
        if (
          item.idCategoria == cat.idCategoria &&
          item.idCategoria != "B9MwktyLd7z4onQIKKAw"
        ) {
          item.categoria = cat.nombre;
          temporal.push(item);
        }
      });
      this.data = coleccion;
      this.productos = temporal;
      this.spinner.hide();
    });
  }

  save() {
    this.addProduct();
  }

  onFileUpload(event) {
    this.spinner.show();
    const files = event.files;
    this.fileProgress(files);
    this.spinner.hide();
  }

  fileProgress(file: any) {
    this.imageUp = false;
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

  showDialogProduct(productos) {
    this.display = true;
    this.ProductEdit = Object.assign({}, productos);
    this.categoria = this.ProductEdit.idCategoria;
  }

  confirmar() {
    let producto: Products = {
      idProducto: this.ProductEdit.idProducto,
      descripcion: this.ProductEdit.descripcion,
      foto: this.ProductEdit.foto,
      idCategoria: this.ProductEdit.idCategoria,
      nombre: this.ProductEdit.nombre,
      isActivo: true,
      precio: this.ProductEdit.precio,
      stock: this.ProductEdit.stock,
      slide: this.ProductEdit.slide,
    };
    console.log(producto);
    this.confirmationService.confirm({
      message: "¿Est&aacute; seguro que desea editar el producto?",
      accept: () => {
        console;
        this.update(producto),
          (err: any) => {
            console.log(err);
            this.showMessage(
              "Error al editar los productos",
              "error",
              "Error!"
            );
          };
        this.display = false;
        this.clearState();
      },
    });
  }

  confirmarEliminar(producto: Products) {
    this.confirmationService.confirm({
      message: "¿Est&aacute; seguro que desea eliminar el producto?",
      accept: () => {
        this.eliminarProduct(producto),
          (err: any) => {
            console.log(err);
            this.showMessage(
              "Error al eliminar los productos",
              "error",
              "Error!"
            );
          };
      },
    });
  }

  update(producto: Products) {
    this.guardarCategoria(producto.idCategoria);
    producto.idCategoria = this.categoria;

    this.productosService.updateProduct(producto),
      (err: any) => {
        console.log(err);
        this.showMessage("Error al editar los productos", "error", "Error!");
      };
    this.clearState();
    this.showMessage("Producto editado exitósamente", "success", "Editado!");
  }

  showAddDialog() {
    this.bandera = true;
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
        this.bandera = false;
        console.log("Guardado");
        this.showMessage("Prducto creado exitósamente", "success", "Agregado!");
      })
      .catch((err: any) => {
        console.log(err);
        this.showMessage("Error al crear el producto", "error", "Error!");
      });
    this.clearState();
  }

  eliminarProduct(producto: Products) {
    console.log(producto);
    this.productosService.deleteProduct(producto.idProducto),
      (err: any) => {
        console.log(err);
        this.showMessage("Error al eliminar los productos", "error", "Error!");
      };
    this.showMessage(
      "Producto eliminado exitósamente",
      "success",
      "Eliminado!"
    );
    this.clearState();
  }

  clearState() {
    this.display = false;
    this.ProductEdit = {
      descripcion: "",
      foto: "",
      idCategoria: "",
      idProducto: "",
      isActivo: true,
      nombre: "",
      precio: 0,
      slide: [],
      stock: 0,
    };
    this.previewUrl = "";
    this.Urls = [];
    this.form.reset();
    this.bandera = false;
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
    for (let i = 0; i < this.categorias.length; i++) {
      if (this.categorias[i].nombre == categoria) {
        this.catName = this.categorias[i].nombre;
        console.log(this.categorias[i].nombre);
        console.log(this.categorias[i].idCategoria);
        this.categoria = this.categorias[i].idCategoria;
      }
    }
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
