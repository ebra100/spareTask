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

  loading = false;
  cartData: any;
  breakpoint: any;
  cartDataArray: any[] = []
  totalPaymentAmount: any


  ngOnInit() {

    this.breakpoint = (window.innerWidth <= constants.DEFAULT_BREAK_POINT) ? 1 : 3;

    this.loading = true;

    setTimeout(() => {

      this.cartData = this.cartService.getCartData()
      Object.keys(this.cartData).forEach(key => {
        let product = this.productService.getProductById(this.cartData[key].productId)
        Object.assign(this.cartData[key], product)
        this.cartDataArray.push(this.cartData[key])
      })
      this.totalPaymentAmount = this.paymentService.calculatePaymentAmount()
      this.loading = false;

    }, 1000)

  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= constants.DEFAULT_BREAK_POINT) ? 1 : 3;
  }

  emptyCart() {

    this.loading = true
    setTimeout(() => {
      this.cartService.emptyCartData();
      this.totalPaymentAmount = this.paymentService.calculatePaymentAmount()
      this.cartDataArray = []
      this.loading = false
    }, 1000)

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

  removeProductFromCart(cart: any) {
    this.cartDataArray.splice(this.cartDataArray.indexOf(cart), 1)
    delete this.cartData[cart.productId]
    this.cartService.saveCartData(this.cartData)
    this.totalPaymentAmount = this.paymentService.calculatePaymentAmount()
  }

  editCartData(cart: any, quantity: number) {

    this.loading = true;

    setTimeout(() => {

      this.cartService.updateCartDataQuantity(cart, quantity)
      this.totalPaymentAmount = this.paymentService.calculatePaymentAmount()
      this.cartService.postCartDataLength(quantity)
      this.loading = false;
      cart.quantity += quantity;
      if (!cart.quantity) {
        this.removeProductFromCart(cart)
      }
    }, 1000)
  }


}
