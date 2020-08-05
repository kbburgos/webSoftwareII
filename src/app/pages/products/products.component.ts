import { Component, OnInit } from "@angular/core";
import { ProductoService } from "../../services/producto.service";
import { Products } from "../../resource/interface/products";
import { ConfirmationService } from "primeng/api";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  display: boolean = false;
  bandera: boolean = false;
  productos: Products[];
  cols: any[];

  editState: boolean = false;
  ProductEdit: Products;

  selectedFile: File = null;

  private fileData: File = null;
  previewUrl: any = null;

  constructor(
    private productosService: ProductoService,
    private confirmationService: ConfirmationService,
    private httpClient: HttpClientModule
  ) {}

  ngOnInit() {
    //  console.log("A VER QUE ONDIA");
    this.productos = [];
    let sub = this.productosService.getProductos().subscribe((item: any) => {
      this.productos = item;
      // console.log(this.productos);
    });
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
    // Show preview
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
      descripcion: "ojala ojala",
      foto: this.previewUrl,
      idCategoria: "1",
      nombre: "ojala",
      precio: 55,
      stock: 44,
    };
    console.log(producto);
    this.productosService
      .pushProductos(producto)
      .then((data: any) => {
        console.log(data);
      })
      .catch((err: any) => {
        console.log(err);
      });
    this.clearState();
  }

  eliminarProduct() {
    let producto: Products = {
      idProducto: "qdPDqyZVzWCORqWfcDVz",
      descripcion: "string",
      foto: "string",
      idCategoria: "1",
      nombre: "string",
      precio: 55,
      stock: 44,
    };
    this.productosService.deleteProduct();
    this.clearState();
  }

  clearState() {
    this.display = false;
    this.ProductEdit = null;
  }
}
