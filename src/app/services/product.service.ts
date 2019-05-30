import { Injectable } from '@angular/core';
import { IProducts } from '../intefaces/IProducts';
import { LocalStorageService } from './local-storage.service';
import { TitledModalWithContentService } from './titled-modal-with-content.service';
let constants = require('../Constants/Constants.json');
let products: any[] = require('../JsonData/Products.json')

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private localStorageService: LocalStorageService,
    private titledModalWithContentService: TitledModalWithContentService) { }

  productsListing(): IProducts[] {

    let productsData = this.localStorageService.getItem(constants.DEFAULT_BRODUCT_KEY)

    if (!productsData)
      return products

    return productsData
  }

  hasEnoughItems(product: IProducts) {

    if (!product.amountleft) {

      this.titledModalWithContentService.open(
        {
          closeButtonName: "close",
          content: "this product has been ran out from the store",
          title: "Error"
        })

      return false

    }

    return true
  }
}
