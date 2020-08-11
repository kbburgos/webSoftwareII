import { Component, OnInit} from '@angular/core';
import { PedidoService } from 'app/services/pedido.service';


@Component({
  selector: 'app-dispatched',
  templateUrl: './dispatched.component.html',
  styleUrls: ['./dispatched.component.css']
})
export class DispatchedComponent implements OnInit {
  listdispatched: Dispatched[];
  listaPedidos: any = [];
  cols: any[];
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA5MjQ5OTU0MjYiLCJpYXQiOjE1OTY5NTExMjMsImV4cCI6MTU5Njk1MjAyM30.uR79EmM_t-WqGAtU_tmqz8eCnWjCfbYoM086TDJYVR8";
  constructor(private pedidosService: PedidoService) { }

  ngOnInit() {

    this.listaPedidos = this.pedidosService.getPedidosDispatchedFromApi(this.token);
    
    this.listdispatched=[
      {codigo: 1, cliente: 'Marcos', entrega: 'Domicilio', fecha: '25/06/2020', monto:10, novedad:''},
      {codigo: 2, cliente: 'Leticia', entrega: 'Domicilio', fecha: '25/06/2020',monto:12, novedad:''},
      {codigo: 3, cliente: 'Franco', entrega: 'Domicilio', fecha: '25/06/2020',monto:9.50, novedad:'Demora'},
      {codigo: 4, cliente: 'Marcelo', entrega: 'Domicilio', fecha: '25/06/2020',monto:6, novedad:''},
      {codigo: 5, cliente: 'Antonio', entrega: 'Domicilio', fecha: '26/06/2020',monto:4, novedad:''},
      {codigo: 6, cliente: 'Sebastian', entrega: 'Domicilio', fecha: '26/06/2020',monto:13.50, novedad:''},
      {codigo: 7, cliente: 'Betsy', entrega: 'Domicilio', fecha: '26/06/2020',monto:14, novedad:''},
      {codigo: 8, cliente: 'Lorena', entrega: 'Domicilio', fecha: '26/06/2020',monto:5, novedad:''},
      {codigo: 9, cliente: 'Edison', entrega: 'Domicilio', fecha: '26/06/2020',monto:8, novedad:''},
      {codigo: 10, cliente: 'Lupe', entrega: 'Domicilio', fecha: '27/06/2020',monto:10, novedad:''},
    ];
    this.cols=[
      {field: 'codigo', header: 'CODIGO'},
      {field: 'cliente', header: 'CLIENTE'},
      {field: 'entrega', header: 'ENTREGA'},
      {field: 'fecha', header: 'FECHA'},
      {field: 'monto', header: 'MONTO'},
      {field: 'novedad', header: 'NOVEDAD'},
    ];
  }

  
  ver(){
    console.log(this.listaPedidos);
  }



}



export interface Dispatched {
  codigo: number;
  cliente: string;
  entrega: string;
  fecha: string;
  monto: number;
  novedad: string;
}