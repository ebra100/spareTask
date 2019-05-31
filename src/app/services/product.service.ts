import { Injectable } from '@angular/core';
import { IProducts } from '../intefaces/IProducts';
import { LocalStorageService } from './local-storage.service';
import { OpenDialogComponent } from '../OpenDialogt/open-dialog.component';
import { OpenDialog } from './open-dialog.service';
let constants = require('../Constants/Constants.json');
let products: any[] = require('../JsonData/Products.json')

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private localStorageService: LocalStorageService,
    private oepnDialog: OpenDialog) { }

  productsListing(): IProducts[] {

    let productsData = this.localStorageService.getItem(constants.DEFAULT_BRODUCT_KEY)

    if (!productsData)
      return products

    return productsData
  }

  getProductById(id) {

    let products = this.productsListing()
    let mathchedProduct = products.filter(item => item.productId === id)
    return mathchedProduct[0]
  }

  editProduct(editProductObj) {

    let productId = editProductObj.productId;
    let editedProductData = editProductObj.product
    let products = this.productsListing();

    for (let index = 0; index < products.length; index++) {
      if (products[index].productId == productId) {
        products[index] = editedProductData;
        products[index].productId = productId;
      }
    }

    this.localStorageService.setItem(constants.DEFAULT_BRODUCT_KEY, products)
    return products
  }

  addProduct(addProductObj) {

    let products = this.productsListing();
    products.push(addProductObj)
    this.localStorageService.setItem(constants.DEFAULT_BRODUCT_KEY, products)
    return products
  }


  hasEnoughItems(product: IProducts) {

    if (!product.amountleft) {

      this.oepnDialog.open(
        {
          component: OpenDialogComponent,
          closeButtonName: "close",
          content: "this product has been ran out from the store",
          title: "Error"
        })

      return false
    }
    return true
  }
}
