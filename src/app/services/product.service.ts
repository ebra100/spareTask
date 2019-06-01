/**
 * @description this service will handle all needed operation we need to apply on produt objet and it will 
 * save it to the local storage
 * 
 */
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

  /**
   * @description funtion that handles produt listing 
   */
  productsListing(): IProducts[] {

    let productsData = this.localStorageService.getItem(constants.DEFAULT_BRODUCT_KEY)

    if (!productsData)
      return products

    return productsData
  }

  /**
   * @description funtion that handles getting specific product by its id
   * @param id 
   */
  getProductById(id) {

    let products = this.productsListing()
    let mathchedProduct = products.filter(item => item.productId === id)
    return mathchedProduct[0]
  }

  /**
   * @description funtion that handles editing of spefic product then save it in local storage
   * @param editProductObj 
   */
  editProduct(editProductObj) {

    let productId = editProductObj.productId;
    let editedProductData = editProductObj.product
    let products = this.productsListing();

    for (let index = 0; index < products.length; index++) {
      if (products[index].productId == productId) {
        products[index] = editedProductData;

        //to keep the id in the object
        products[index].productId = productId;
      }
    }

    this.localStorageService.setItem(constants.DEFAULT_BRODUCT_KEY, products)
    return products
  }

  /**
 * @description funtion that handles addition of spefic product then save it in local storage
 * @param addProductObj 
 */
  addProduct(addProductObj) {

    let products = this.productsListing();
    products.push(addProductObj)
    this.localStorageService.setItem(constants.DEFAULT_BRODUCT_KEY, products)
    return products
  }

  /**
   * @description funtion that handles validation on the produt left amount in store by alert in case of 
   * error or do nothing in success
   * @param product 
   */
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
