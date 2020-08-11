import { Component, OnInit } from "@angular/core";
import { ProductoService } from "../../services/producto.service";
import { Products } from "../../resource/interface/products";
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
  selector: "app-promotions",
  templateUrl: "./promotions.component.html",
  styleUrls: ["./promotions.component.css"],
})
export class PromotionsComponent implements OnInit {

  display: boolean = false;
  imagen: any;
  productos: Products[];

  colsdata: Products[]

  cols = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'descripcion', header: 'Descripcion' },
    { field: 'categoria', header: 'Categoria' },
    { field: 'precio', header: 'Precio' },
    { field: 'stock', header: 'Stock' },
    { field: 'imagen', header: 'Imagen' }
  ];

  constructor(
    private productosService: ProductoService,
    private formBuilder: FormBuilder,
    private caterogiasService: CategoriaService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.colsdata=[];

    let subs = this.productosService.getProductos().subscribe(
      (data: any) => {
        data.map(item=>{
          if(item.idCategoria==='B9MwktyLd7z4onQIKKAw' && item.isActivo){
            this.colsdata.push(item)
          }
        })
        this.productos = [];
        this.productos = this.colsdata;
        console.log(this.productos)
        this.spinner.hide();
        subs.unsubscribe();
      },
      (err: any) => {
        console.log(err);
        this.spinner.hide();
        subs.unsubscribe();
      }
    );
  }

  showDialog(imagen:any) {
    this.display = true;
    this.imagen = imagen;
  }

  
}
