import { Component, OnInit } from "@angular/core";
import { ProductoService } from "../../core/services/product/producto.service";
import { Products } from "../../core/interface/products";
import { ConfirmationService } from "primeng/api";

import { NgxSpinnerService } from "ngx-spinner";
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
})
export class ProductsComponent implements OnInit {
  private form: FormGroup;
  display: boolean = false;
  bandera: boolean = false;
  slide: boolean = false;
  mensaje: boolean = false;

  productos: Products[] = [];
  categorias: Categoria[] = [];

  cols: any = [];

  ProductEdit: Products;

  categoria: string = "";

  catName: string = "Categoría";

  Urls: any = [];

  allfiles: any = [];

  previewUrl: any = null;

  producSlide: any = [];

  message: any = {
    mensaje: "",
    accion: "",
  };

  constructor(
    private productosService: ProductoService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private caterogiasService: CategoriaService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.productos = [];

    let cat = this.caterogiasService.getCategorias().subscribe((item: any) => {
      this.categorias = item;
    });

    let pro = this.productosService.getProductos().subscribe((item: any) => {
      console.log(item);
      
      this.productos = item;
      this.spinner.hide();
      // sub.unsubscribe();
    });

    /*
    item.map((pro) => {
        if (pro.idCategoria != "B9MwktyLd7z4onQIKKAw") {
          this.productos.push(pro);
          for (let i = 0; i < this.categorias.length; i++) {
            if (this.categorias[i].idCategoria == pro.idCategoria) {
              (pro.idCategoria = this.categorias[i].nombre),
                this.cols.push(pro);
            }
          }
        }
      });
    */

    this.buildForm();
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
    for (let i = 0; i < file.length; i++) {
      var mimeType = file[i].type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }

      this.allfiles.push(file[i]);
      console.log(file[i]);
      const reader = new FileReader();
      reader.onload = (fileData) => {
        this.previewUrl = reader.result;
        this.Urls.push(this.previewUrl);
      };
      reader.readAsDataURL(file[i]);
    }
  }

  showDialogProduct(productos) {
    this.display = true;
    this.ProductEdit = productos;
  }

  confirmar() {
    this.confirmationService.confirm({
      message: "¿Est&aacute; seguro que desea editar el producto?",
      accept: () => {
        if (this.categoria == ''){
          this.update(this.ProductEdit);
        }else{
          this.ProductEdit.idCategoria = this.categoria;
          this.update(this.ProductEdit);
        }
      },
    });
  }

  update(producto: Products) {
    this.mensaje = true;

    this.message = {
      mensaje: "Se ha modificado el producto de la lista",
      accion: "Nuevos detalles!",
    };

    this.guardarCategoria(producto.idCategoria);
    producto.idCategoria = this.categoria;
    this.productosService.updateProduct(producto);
    //console.log(producto);
    this.clearState();
  }

  showAddDialog() {
    this.bandera = true;
  }

  addProduct() {
    // console.log(this.previewUrl);
    //console.log(this.Urls)

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
        this.mensaje = true;

        this.message = {
          mensaje: "Se ha agregado el producto a la lista",
          accion: "Nueva Producto!",
        };
        console.log("Guardado");
      })
      .catch((err: any) => {
        console.log(err);
      });
    this.clearState();
  }

  eliminarProduct(producto: Products) {
    console.log(producto);

    this.mensaje = true;

    this.message = {
      mensaje: "Se ha eliminado el producto de la lista",
      accion: "Elimado!",
    };

    this.productosService.deleteProduct(producto.idProducto);
    this.clearState();
  }

  clearState() {
    this.display = false;
    this.ProductEdit = null;
    this.previewUrl = null;
    this.Urls = [];
    this.form.reset();
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
}
