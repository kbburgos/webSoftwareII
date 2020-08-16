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
import { PromotionNewComponent } from "../promotion-new/promotion-new.component";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-old-promotion",
  templateUrl: "./old-promotion.component.html",
  styleUrls: ["./old-promotion.component.css"],
})
export class OldPromotionComponent implements OnInit {
  private form: FormGroup;

  display: boolean = false;
  bandera: boolean = false;
  mensaje: boolean = false;
  slide: boolean = false;

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
    this.clearState();
    this.spinner.show();
    this.productos = [];

    let subs = this.productosService.getProductos().subscribe(
      (data: any) => {
        this.productos = data;
        console.log(this.productos);
        this.spinner.hide();
        //subs.unsubscribe();
      },
      (err: any) => {
        console.log(err);
        this.spinner.hide();
        subs.unsubscribe();
      }
    );
  }

  clearState() {
    this.display = false;
    this.previewUrl = null;
    this.Urls = [];
  }

  showSlide(producto: any[]) {
    this.producSlide = producto;
    this.slide = true;
  }

  editarEstado(producto: Products) {
    console.log(producto);
    this.mensaje = true;

    this.message = {
      mensaje: "Se ha activado la promoción",
      accion: "Nueva promoción!",
    };

    producto.isActivo = true;
    this.productosService.updateProduct(producto);
    this.clearState();
  }
}
