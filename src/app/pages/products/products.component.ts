import { Component, OnInit} from '@angular/core';
import { ProductsService } from '../../resource/service/products.service';
import { Products } from '../../resource/interface/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  display: boolean = false;
  listproducts: Products[];
  cols: any[];
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getProducts()
      .snapshotChanges()
      .subscribe(item => {
        this.listproducts = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$idproduct"] = element.key;
          this.listproducts.push(x as Products);
        })
      })
  }

  showDialogProduct() {
    this.display = true;
  }
}
