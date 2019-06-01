/**
 * @description this service will handle all needed operation we need to apply on cart objet and it will 
 * save it to the local storage
 * 
 */

import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
let cart: any = require('../JsonData/Cart.json');
let constants = require('../Constants/Constants.json');

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private localStorageService: LocalStorageService) { }


  /**
   * @description function handles
   * @param postCartDataParams post card in cart object and save it to local storage
   * @param productId 
   */
  postCartData(postCartDataParams: any, productId: number) {

    let cartData = this.getCartData();

    if (cartData[productId])
      cartData = this.updateCartDataQuantity({ postCartDataParams, productId }, postCartDataParams.quantity)

    else
      cartData[productId] = postCartDataParams

    this.localStorageService.setItem(constants.DEFAULT_CART_KEY, cartData)

    return cartData
  }

  /**
   * @description funtion that handles remove specfic product from the cart
   * @param cartDataArray 
   * @param cartData 
   * @param cart 
   */
  removeFromCart(cartDataArray, cartData, cart) {
    cartDataArray.splice(cartDataArray.indexOf(cart), 1)
    delete cartData[cart.productId]
    this.localStorageService.setItem(constants.DEFAULT_CART_KEY, cartData)
  }

  /**
   * @description function that handles getting data of the cart
   */
  getCartData() {

    let cartData = this.localStorageService.getItem(constants.DEFAULT_CART_KEY)

    if (!cartData)
      return cart

    return cartData
  }

  /**
   *@description function that handles getting length of the cart
   */
  getCartDataLength() {

    let cartDataLength = this.localStorageService.getItem(constants.DEFAULT_CART_LENGTH_KEY)

    if (!cartDataLength)
      return 0

    return cartDataLength
  }

  /**
   * @description function that handles emtying the cart
   */
  emptyCartData() {

    this.localStorageService.setItem(constants.DEFAULT_CART_KEY, {})
    this.localStorageService.setItem(constants.DEFAULT_CART_LENGTH_KEY, '0')
  }

  /**
   * @description funtion that handles length of the cart updating 
   * @param quantity 
   */
  postCartDataLength(quantity) {

    let cartDataLength = +this.getCartDataLength();

    cartDataLength += +quantity;

    this.localStorageService.setItem(constants.DEFAULT_CART_LENGTH_KEY, cartDataLength)

    return cartDataLength
  }

  /**
   * @description funtion that handles updating the quantity of specific cart
   * @param editedCartData 
   * @param quantity 
   */
  updateCartDataQuantity(editedCartData, quantity) {

    let cartData = this.getCartData();
    let productId = editedCartData.productId;
    cartData[productId].quantity += quantity
    return cartData

  }
}

