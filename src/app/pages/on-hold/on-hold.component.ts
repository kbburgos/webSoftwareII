import { Component, OnInit} from '@angular/core';
import { OnHold } from '../../resource/interface/onhold';

@Component({
  selector: 'app-on-hold',
  templateUrl: './on-hold.component.html',
  styleUrls: ['./on-hold.component.css']
})
export class OnHoldComponent implements OnInit {
  display: boolean = false;
  selectedOnHold: OnHold;
  listonhold: OnHold[];
  cols: any[];
  selectedValue: string;

  constructor() { }

  ngOnInit() {
    this.listonhold=[
        {codigo: 1, cliente: 'Carlos Mendez', entrega: 'domicilio', fecha: '28/06/2020', 'monto': '5.00'},
        {codigo: 2, cliente: 'Lucia Meza', entrega: 'domicilio', fecha: '28/06/2020', 'monto': '15.48'},
        {codigo: 3, cliente: 'Marco Solis', entrega: 'domicilio', fecha: '28/06/2020', 'monto': '12.45'},
        {codigo: 4, cliente: 'Juan Naraez', entrega: 'domicilio', fecha: '28/06/2020', 'monto': '6.50'},
        {codigo: 5, cliente: 'Byron Perez', entrega: 'domicilio', fecha: '28/06/2020', 'monto': '7.00'},
        {codigo: 6, cliente: 'Dayanna Velez', entrega: 'domicilio', fecha: '28/06/2020', 'monto': '9.00'},
      ];
    
    this.cols=[
      {field: 'codigo', header: 'CODIGO'},
      {field: 'cliente', header: 'CLIENTE'},
      {field: 'entrega', header: 'ENTREGA'},
      {field: 'fecha', header: 'FECHA'},
      {field: 'monto', header: 'MONTO'},
    ];
  }

  showDialogOnHold() {
    this.display = true;
  }

  deleteOnHold() {
    let index = this.listonhold.indexOf(this.selectedOnHold);
    this.listonhold = this.listonhold.filter((val, i) => i != index);
    this.display = false;
  }
}

