import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
let cart: any[] = require('../JsonData/Cart.json');
let constants = require('../Constants/Constants.json');

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private localStorageService: LocalStorageService) { }


  postCartData(postCartDataParams: any) {

    let cartData = this.getCartData();

    if (cartData[postCartDataParams.productId])
      cartData[postCartDataParams.productId].quantity++

    else
      cart.push(postCartDataParams)
      
    this.localStorageService.setItem(constants.DEFAULT_CART_KEY, postCartDataParams)

  }

  getCartData() {

    let cartData = this.localStorageService.getItem(constants.DEFAULT_CART_KEY)

    if (!cartData)
      return cart
  }

}

