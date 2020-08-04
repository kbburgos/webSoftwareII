import { Component, OnInit } from "@angular/core";
import { ProductoService } from "../../services/producto.service";
import { Products } from "../../resource/interface/products";
import {ConfirmationService} from 'primeng/api';
//import { Promociones } from "../../resource/interface/promociones"
//import { PromocionesService } from "../../services/promociones.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  display: boolean = false;
  productos: Products[];
  cols: any[];

  editState: boolean = false;
  ProductEdit: Products;

  constructor(private productosService: ProductoService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
    console.log("A VER QUE ONDIA");
    this.productos = [];

    let sub = this.productosService.getProductos().subscribe((item: any) => {
      this.productos = item;
      console.log(this.productos);
    });
  }
  
  showDialogProduct(productos) {
    this.display = true;
    this.ProductEdit = productos;
  }

  confirmarEditar(){
    this.confirmationService.confirm({
      message: '¿Est&aacute; seguro que desea editar el producto?',
      accept: () => {
          this.productosService.updateProduct(this.ProductEdit);
          this.clearState();
      }
  });
  }

  addProduct() {
    let producto: Products = {
      descripcion: "string",
      foto: "string",
      idCategoria: "1",
      nombre: "string",
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
