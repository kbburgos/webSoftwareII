import { Component, OnInit } from "@angular/core";
import { ProductoService } from "../../services/producto.service";
import { Products } from "../../resource/interface/products";
import { ConfirmationService } from "primeng/api";

import { HttpClientModule } from "@angular/common/http";
import { NgxSpinnerService } from "ngx-spinner";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";

import { Categoria } from "../../resource/interface/categoria";
import { CategoriaService } from "../../services/categoria.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  private form: FormGroup;
  display: boolean = false;
  bandera: boolean = false;
  imgChange: boolean = false;
  productos: Products[];
  categorias: Categoria[];

  cols: any = [];

  categoriasNames: string[] = [];

  ProductEdit: Products;

  categoria: string = "";
  //private fileData: File[] = [];
  Urls: any = [];
  //previewUrl: any[] = [];
  promocion: boolean = false;
  // file: File = null;
  allfiles: any = [];

  previewUrl: any = null;

  lista: any[];

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

    let pro = this.productosService.getProductos().subscribe((item: any) => {
      this.productos = item;
      console.log("productos", this.productos);
      this.spinner.hide();
      // sub.unsubscribe();
    });

    let cat = this.caterogiasService.getCategorias().subscribe((item: any) => {
      this.categorias = item;
      item.map((categoria) => {
        this.categoriasNames.push(categoria.nombre);
      });
      console.log("categorias Nombres ", this.categoriasNames);
      console.log("categorias ", this.categorias);
      this.productos.map((producto) => {
        this.catNames(producto);
      });
    });

    this.buildForm();
  }

  save() {
    this.addProduct();
  }

  isPromocion(event) {
    this.promocion = event.checked;

    if (this.promocion) {
      let catPromocion = "1";
      this.validateCat(catPromocion);
    }
    console.log(this.promocion);
  }

  onFileUpload(event) {
    this.spinner.show();
    const files = event.files;
    this.fileProgress(files);
    this.spinner.hide();
  }

  fileProgress(file: any) {
    for (let i = 0; i < file.length; i++) {
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

  confirmarEditar() {
    this.confirmationService.confirm({
      message: "¿Est&aacute; seguro que desea editar el producto?",
      accept: () => {
        this.catId(this.ProductEdit);
      },
    });
  }

  update(producto: Products) {
    this.productosService.updateProduct(producto);
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
      precio: this.form.get("precio").value,
      stock: this.form.get("stock").value,
      slide: this.Urls,
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
    console.log(categoria);
    this.validateCat(categoria);
  }

  validateCat(categoria: string) {
    let categoriapro = parseInt(categoria);
    for (let i = 0; i < this.categorias.length; i++) {
      if (this.categorias[i].codigo == categoriapro) {
        console.log(this.categorias[i].codigo);
        console.log(this.categorias[i].idCategoria);
        this.categoria = this.categorias[i].idCategoria;
      }
    }
  }

  catNames(producto: Products) {
    //console.log("entra???")
    let catname: string = "";
    for (let i = 0; i < this.categorias.length; i++) {
      if (this.categorias[i].idCategoria == producto.idCategoria) {
        catname = this.categorias[i].nombre;
        let colcat = {
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          idCategoria: catname,
          foto: producto.foto,
          precio: producto.precio,
          stock: producto.stock,
          idProducto: producto.idProducto,
          slide: producto.slide,
        };
        this.cols.push(colcat);
      }
    }
    console.log("Columnas ", this.cols);
    this.lista = this.cols;
  }

  catId(producto: Products) {
    let slide = [];
    if (producto.slide) {
      slide = producto.slide;
    }
    let catname: string = "";
    for (let i = 0; i < this.categorias.length; i++) {
      if (this.categorias[i].nombre == producto.idCategoria) {
        catname = this.categorias[i].idCategoria;
        let colcat = {
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          idCategoria: catname,
          foto: producto.foto,
          precio: producto.precio,
          stock: producto.stock,
          idProducto: producto.idProducto,
          slide: slide,
        };

        this.update(colcat);
      }
    }
  }
}
