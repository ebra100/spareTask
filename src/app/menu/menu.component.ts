import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { LocalStorageService } from '../services/local-storage.service';
import { IProducts } from '../intefaces/IProducts';
import { CartService } from '../services/cart.service';
let constants = require('../Constants/Constants.json');

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private productService: ProductService,
    private localStorageService: LocalStorageService,
    private cartService: CartService) { }

  color = 'primary';
  mode = 'indeterminate';
  value = 30;
  spinnerWithoutBackdrop = true;
  breakpoint: any;
  productsData: any[]
  cartData: any = {}



  ngOnInit() {

    this.breakpoint = (window.innerWidth <= constants.DEFAULT_BREAK_POINT) ? 1 : 3;

    setTimeout(() => {

      this.productsData = this.productService.productsListing();
      this.cartData = this.cartService.getCartData();

      if (this.productsData)
        this.spinnerWithoutBackdrop = false;

    }, constants.DEFAULT_DELAY);

  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= constants.DEFAULT_BREAK_POINT) ? 1 : 3;
  }

  addProductToCart(product: IProducts, ) {

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
      productId: product.productId
    }

    this.spinnerWithoutBackdrop = true;

    setTimeout(() => {
      this.cartData = this.cartService.postCartData(cartParams, product.productId)
      this.spinnerWithoutBackdrop = false;
    }, 1000)
  }
}
