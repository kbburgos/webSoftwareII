import { Component, OnInit } from "@angular/core";
import { ProductoService } from "../../services/producto.service";
import { Products } from "../../resource/interface/products";
//import { Promociones } from "../../resource/interface/promociones"
//import { PromocionesService } from "../../services/promociones.service";

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

  previewUrl: any = null;

  editState: boolean = false;
  ProductEdit: Products;

  constructor(private productosService: ProductoService) {}

  ngOnInit() {
   // console.log("A VER QUE ONDIA");

    let sub = this.productosService.getProductos().subscribe((item: any) => {
      this.productos = [];
      this.productos = item;
     // console.log(this.productos);
    });
  }
  
  showDialogProduct() {
    this.display = true;
  }


  showAddDialog() {
    this.bandera = true;
  }


  updateProduct(producto: Products) {
    //this.productosService.updateProduct(producto);
    this.clearState();
  }

  addProduct() {
    let producto: Products = {
      descripcion: "string",
      foto: "string",
      idCategoria: "1",
      nombre: "sfsfsdf",
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
    this.editState = false;
    this.ProductEdit = null;
  }
}
