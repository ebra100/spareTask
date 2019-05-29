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
  cartData: any[] = []



  ngOnInit() {

    this.breakpoint = (window.innerWidth <= constants.DEFAULT_BREAK_POINT) ? 1 : 2;

    setTimeout(() => {

      this.productsData = this.productService.productsListing();
      this.cartData = this.cartService.getCartData();
      this.spinnerWithoutBackdrop = false;

    }, constants.DEFAULT_DELAY);

  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= constants.DEFAULT_BREAK_POINT) ? 1 : 2;
  }

  addProductToCart(product: IProducts) {

    this.cartData[product.productId] = {
      quantity: 1,
      ...product
    }

    this.cartService.postCartData(this.cartData)
  }

}
