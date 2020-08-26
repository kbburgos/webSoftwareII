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
  providers: [MessageService],
})
export class OldPromotionComponent implements OnInit {
  private form: FormGroup;

  display: boolean = false;
  bandera: boolean = false;
  mensaje: boolean = false;
  slide: boolean = false;

  data: any = "";

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
    { field: "precio", header: "Precio" },
    { field: "stock", header: "Stock" },
  ];

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

    this.cargar()
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
      if (item.idCategoria == "B9MwktyLd7z4onQIKKAw" && !item.isActivo) {
        temporal.push(item);
      }
    });
    this.data = coleccion;
    this.productos = temporal;
    this.spinner.hide();
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
    this.showMessage("Promoción activa", "success", "Activada!");
    producto.isActivo = true;
    this.productosService.updateProduct(producto);
    this.clearState();
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
