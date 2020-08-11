import { Component, OnInit } from "@angular/core";
import { ProductoService } from "../../services/producto.service";
import { Products } from "../../resource/interface/products";
import { ConfirmationService } from "primeng/api";

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
  slide: boolean = false;
  productos: Products[]=[];
  categorias: Categoria[]=[];

  cols: any = [];

  ProductEdit: Products;

  categoria: string = "";

  Urls: any = [];

  allfiles: any = [];

  previewUrl: any = null;

  producSlide: any = [];

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
      item.map((pro) => {
        if (pro.idCategoria != "B9MwktyLd7z4onQIKKAw") {
          this.productos.push(pro);
          this.validarCols(pro);
        }
      });
      this.spinner.hide();
      // sub.unsubscribe();
    });

    this.buildForm();
  }

  validarCols(producto: Products) {
    for (let i = 0; i < this.categorias.length; i++) {
      if (this.categorias[i].idCategoria == producto.idCategoria) {
        (producto.idCategoria = this.categorias[i].nombre),
          this.cols.push(producto);
      }
    }
    console.log(this.cols)
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
        this.update(this.ProductEdit);
      },
    });
  }

  update(producto: Products) {
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
        console.log("Guardado");
      })
      .catch((err: any) => {
        console.log(err);
      });
    this.clearState();
  }

  eliminarProduct(producto: Products) {
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
    for (let i = 0; i < this.categorias.length; i++) {
      if (this.categorias[i].nombre == categoria) {
        console.log(this.categorias[i].nombre);
        console.log(this.categorias[i].idCategoria);
        this.categoria = this.categorias[i].idCategoria;
      }
    }
  }

  showSlide(producto: any[],) {
    console.log(producto.length)
    this.producSlide = producto
    this.slide = true;
  }
}
