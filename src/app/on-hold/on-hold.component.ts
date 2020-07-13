import { Component, OnInit} from '@angular/core';
import { OnHold } from '../resource/interface/onhold';
import { OnHoldService } from '../resource/service/onholdservice';

@Component({
  selector: 'app-on-hold',
  templateUrl: './on-hold.component.html',
  styleUrls: ['./on-hold.component.css']
})
export class OnHoldComponent implements OnInit {
  displayDialog: boolean;
  onhold: OnHold = {};
  selectedOnHold: OnHold;
  listonhold: OnHold[];
  cols: any[];

  constructor(private onholdService: OnHoldService) { }

  ngOnInit() {
    this.onholdService.getOnHold().then(listonhold => this.listonhold = listonhold);
    this.cols=[
      {field: 'codigo', header: 'CODIGO'},
      {field: 'cliente', header: 'CLIENTE'},
      {field: 'entrega', header: 'ENTREGA'},
      {field: 'fecha', header: 'FECHA'},
      {field: 'monto', header: 'MONTO'},
    ];
  }

  showDialogOnHold() {
    this.onhold = {};
    this.displayDialog = true;
  }

  deleteOnHold() {
    let index = this.listonhold.indexOf(this.selectedOnHold);
    this.listonhold = this.listonhold.filter((val, i) => i != index);
    this.onhold = null;
    this.displayDialog = false;
}
}

