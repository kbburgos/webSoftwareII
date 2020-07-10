import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  listproducts: Products[];
  cols: any[];
  constructor() { }

  ngOnInit() {
    this.listproducts=[
      {codigo: 1, nombre: 'Producto 1', stock: 150, costoU: 8},
      {codigo: 2, nombre: 'Producto 2', stock: 80, costoU: 9},
      {codigo: 3, nombre: 'Producto 3', stock: 90, costoU: 4},
      {codigo: 4, nombre: 'Producto 4', stock: 18, costoU: 18},
      {codigo: 5, nombre: 'Producto 5', stock: 70, costoU: 20},
      {codigo: 6, nombre: 'Producto 6', stock: 60, costoU: 3},
      {codigo: 7, nombre: 'Producto 7', stock: 40, costoU: 5},
      {codigo: 8, nombre: 'Producto 8', stock: 94, costoU: 7},
      {codigo: 9, nombre: 'Producto 9', stock: 66, costoU: 6},
      {codigo: 10, nombre: 'Producto 10', stock: 48, costoU: 4},
    ];
    this.cols=[
      {field: 'codigo', header: 'CODIGO'},
      {field: 'nombre', header: 'NOMBRE'},
      {field: 'stock', header: 'STOCK'},
      {field: 'costoU', header: 'COSTO UNITARIO'},
    ];
  }
}

export interface Products{
  codigo: number;
  nombre: string;
  stock: number;
  costoU: number;
}