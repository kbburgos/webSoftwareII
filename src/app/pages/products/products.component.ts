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
  productos: Products[];
  cols: any[];

  editState: boolean = false;
  ProductEdit: Products;

  constructor(private productosService: ProductoService) {}

  ngOnInit() {
    console.log("A VER QUE ONDIA");

    let sub = this.productosService.getProductos().subscribe((item: any) => {
      this.productos = [];
      this.productos = item;
      console.log("HELLO MUNDO ", item);
      //this.listproducts = [];
    });
  }

  deleteProduct(producto: Products) {
    this.clearState();
    this.productosService.deleteProduct(producto);
  }

  showDialogProduct() {
    this.display = true;
  }

  updateProduct(producto: Products) {
    this.productosService.updateProduct(producto);
    this.clearState();
  }

  clearState() {
    this.editState = false;
    this.ProductEdit = null;
  }
}
