import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
let cart: any = require('../JsonData/Cart.json');
let constants = require('../Constants/Constants.json');

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private localStorageService: LocalStorageService) { }


  postCartData(postCartDataParams: any, productId: number) {

    let cartData = this.getCartData();

    if (cartData[productId])
      cartData[productId].quantity += postCartDataParams.quantity

    else
      cartData[productId] = postCartDataParams

    this.localStorageService.setItem(constants.DEFAULT_CART_KEY, cartData)

    return cartData
  }

  getCartData() {

    let cartData = this.localStorageService.getItem(constants.DEFAULT_CART_KEY)

    if (!cartData)
      return cart

    return cartData
  }

}

