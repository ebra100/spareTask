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

  saveCartData(saveCartDataParams) {
    this.localStorageService.setItem(constants.DEFAULT_CART_KEY, saveCartDataParams)

  }
  
  getCartData() {

    let cartData = this.localStorageService.getItem(constants.DEFAULT_CART_KEY)

    if (!cartData)
      return cart

    return cartData
  }

  getCartDataLength() {

    let cartDatagetCartData = this.localStorageService.getItem("cartDataLengt")

    if (!cartDatagetCartData)
      return 0

    return cartDatagetCartData
  }

  emptyCartData() {

    this.localStorageService.setItem(constants.DEFAULT_CART_KEY, {})
    let cartDatagetCartData = this.localStorageService.setItem("cartDataLengt", '0')

    return {}
  }

  postCartDataLength(quantity) {

    let cartDataLength = +this.getCartDataLength();

    cartDataLength += +quantity;

    this.localStorageService.setItem("cartDataLengt", cartDataLength)

    return cartDataLength
  }

  updateCartDataQuantity(editedCartData, quantity) {

    let cartData = this.getCartData();
    let productId = editedCartData.productId;
    cartData[productId].quantity += quantity
    this.localStorageService.setItem(constants.DEFAULT_CART_KEY, cartData)

  }
}

