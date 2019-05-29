import { Injectable } from '@angular/core';
import { IProducts } from '../intefaces/IProducts';
import { LocalStorageService } from './local-storage.service';
let constants = require('../Constants/Constants.json');
let products: any[] = require('../JsonData/Products.json')

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private localStorageService: LocalStorageService) { }

  productsListing(): IProducts[] {

    let productsData = this.localStorageService.getItem(constants.DEFAULT_BRODUCT_KEY)

    if (!productsData)
      return products
  }
}
