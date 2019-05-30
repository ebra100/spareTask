import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { LocalStorageService } from '../services/local-storage.service';
import { IProducts } from '../intefaces/IProducts';
import { CartService } from '../services/cart.service';
import { PaymentService } from '../services/payment.service';
let constants = require('../Constants/Constants.json');

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private productService: ProductService,
    private localStorageService: LocalStorageService,
    private cartService: CartService,
    private paymentService: PaymentService) { }

  color = 'primary';
  mode = 'indeterminate';
  value = 30;
  spinnerWithoutBackdrop = true;
  breakpoint: any;
  productsData: any[]
  cartData: any = {}
  totalCartLength: number = 0;
  totalPaymentAmount: number = 0

  ngOnInit() {

    this.breakpoint = (window.innerWidth <= constants.DEFAULT_BREAK_POINT) ? 1 : 3;

    setTimeout(() => {

      this.productsData = this.productService.productsListing();
      this.cartData = this.cartService.getCartData();
      this.totalCartLength = this.cartService.getCartDataLength();
      this.totalPaymentAmount = this.paymentService.calculatePaymentAmount()

      if (this.productsData)
        this.spinnerWithoutBackdrop = false;

    }, constants.DEFAULT_DELAY);

  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= constants.DEFAULT_BREAK_POINT) ? 1 : 3;
  }

  addProductToCart(product: IProducts, ) {

    let isEnough = this.productService.hasEnoughItems(product)

    if (!isEnough)
      return;

    this.editCartData(product, 1)

  }

  deleteProductFromCart(product: IProducts) {

    if (!this.cartData[product.productId])
      return;

    if (this.cartData[product.productId] && !this.cartData[product.productId].quantity)
      return;

    this.editCartData(product, -1)

  }

  editCartData(product: IProducts, quantity: number) {

    let cartParams = {
      quantity: quantity,
      ...product
    }

    this.spinnerWithoutBackdrop = true;

    setTimeout(() => {

      this.cartData = this.cartService.postCartData(cartParams, product.productId)
      this.totalCartLength = this.cartService.postCartDataLength(quantity)
      this.totalPaymentAmount = this.paymentService.calculatePaymentAmount()

      this.spinnerWithoutBackdrop = false;
    }, 1000)
  }

}
