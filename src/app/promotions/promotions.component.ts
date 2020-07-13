import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {
  listpromotions: Promotions[];
  cols: any[];
  constructor() { }

  ngOnInit() {
    this.listpromotions=[
      {producto: 'Producto 1', vigencia: '15/07/2020', condicion: 'Condición 1'},
      {producto: "Producto 4", vigencia: '20/07/2020', condicion: 'Condición 2'},
      {producto: "Producto 10", vigencia: '20/07/2020', condicion: 'Condición 3'},
      {producto: "Producto 7", vigencia: '25/07/2020', condicion: 'Condición 4'},
      {producto: "Producto 8", vigencia: '25/07/2020', condicion: 'Condición 5'},
      {producto: "Producto 2", vigencia: '30/07/2020', condicion: 'Condición 6'},
      {producto: "Producto 5", vigencia: '30/07/2020', condicion: 'Condición 7'},
      {producto: "Producto 12", vigencia: '30/07/2020', condicion: 'Condición 8'},
    ];
    this.cols=[
      {field: 'producto', header: 'PRODUCTO'},
      {field: 'vigencia', header: 'FECHA DE VIGENCIA'},
      {field: 'condicion', header: 'CONDICION'},
    ];
  }
}

export interface Promotions {
  producto: string;
  vigencia: string;
  condicion: string;
}