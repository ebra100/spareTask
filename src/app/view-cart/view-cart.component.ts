/**
 *@description class that handles viewing the cart which includes the selected products
 *allows user to addOrRemove more quantity of any item 
 *allows user to empty the cart
 */

/**
 * the cart data is object and the key will be product it will faclitate the joining operation between 
 * the cart and the product 
 */
import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { PaymentService } from '../services/payment.service';
import { IProducts } from '../intefaces/IProducts';
let constants = require('../Constants/Constants.json');

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {

  constructor(private cartService: CartService,
    private productService: ProductService,
    private paymentService: PaymentService) { }

  loading = true;
  cartData: any;
  breakpoint: any;
  cartDataArray: any[] = []
  totalPaymentAmount: any

  ngOnInit() {

    setTimeout(() => {

      this.cartData = this.cartService.getCartData()

      //convert the cart object to array to make it itteratble 
      Object.keys(this.cartData).forEach(key => {
        let product = this.productService.getProductById(this.cartData[key].productId)
        Object.assign(this.cartData[key], product)
        this.cartDataArray.push(this.cartData[key])
      })
      this.totalPaymentAmount = this.paymentService.calculatePaymentAmount()
      this.loading = false;

    }, constants.DEFAULT_DELAY)

  }


  /**
   * @description function that handles empty the cart
   */
  emptyCart() {

    this.loading = true
    setTimeout(() => {
      this.cartService.emptyCartData();
      this.totalPaymentAmount = this.paymentService.calculatePaymentAmount()
      this.cartDataArray = []
      this.loading = false
    }, constants.DEFAULT_DELAY)

  }


  addProductToCart(cart: any) {

    let isEnough = this.productService.hasEnoughItems(cart)

    if (!isEnough)
      return;

    this.editCartData(cart, 1)


  }

  deleteProductFromCart(cart: any) {

    this.editCartData(cart, -1)

  }

  /**
   * @description this function will check for speific item inside the cart if this is the last item exists in 
   * the cart from this product before deleting it so we can remove it all the way from the cart
   * @param cart 
   */
  removeProductFromCart(cart: any) {

    if (cart.quantity)
      return;

    this.cartService.removeFromCart(this.cartDataArray, this.cartData, cart)
    this.totalPaymentAmount = this.paymentService.calculatePaymentAmount()
  }

  editCartData(cart: any, quantity: number) {

    this.loading = true;

    let postCartDataParams = {
      quantity: quantity
    }
    setTimeout(() => {

      this.cartService.postCartData(postCartDataParams, cart.productId)
      this.totalPaymentAmount = this.paymentService.calculatePaymentAmount()
      this.cartService.postCartDataLength(quantity)
      this.loading = false;

      //increase quantity so it will reflect in the ui 
      cart.quantity += quantity;

      this.removeProductFromCart(cart)

    }, constants.DEFAULT_DELAY)
  }


}
