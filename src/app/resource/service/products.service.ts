import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Products } from '../interface/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  productList: AngularFireList<any>;
  selectedProduct: Products = new Products();

  constructor(private firebase: AngularFireDatabase) { }

  getProducts(){
    return this.productList = this.firebase.list('products');
  }

  insertProduct(product: Products){
    this.productList.push({
      nombre: product.nombre,
      categoria: product.categoria,
      descripcion: product.descripcion,
      precio: product.precio,
      stock: product.stock
    })
  }

  updateProduct(product: Products){
    this.productList.update(product.$idproducto, {
      nombre: product.nombre,
      categoria: product.categoria,
      descripcion: product.descripcion,
      precio: product.precio,
      stock: product.stock
    });
  }

  deleteProduct($idproducto: string){
    this.productList.remove($idproducto);
  }
}
