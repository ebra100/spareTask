/**
 * @description this component handles listing of menu items as 3 cols layout
 */

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../services/product.service';
import { LocalStorageService } from '../services/local-storage.service';
import { IProducts } from '../intefaces/IProducts';
import { CartService } from '../services/cart.service';
import { PaymentService } from '../services/payment.service';
import { OpenDialog } from '../services/open-dialog.service';
import { EditOrAddProductComponent } from '../edit-or-add-product/edit-or-add-product.component';
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
    private changeDetector: ChangeDetectorRef,
    private paymentService: PaymentService,
    private openDialog: OpenDialog,
  ) {
  }

  loading = true;
  breakpoint: any;
  productsData: any[]
  cartData: any = {}
  totalCartLength: number = 0;
  totalPaymentAmount: number = 0

  /**
   * @description fetch all data needed to init the page (products data , cart data , length of card , total payment )
   */
  ngOnInit() {

    setTimeout(() => {

      this.productsData = this.productService.productsListing();
      this.cartData = this.cartService.getCartData();
      this.totalCartLength = +this.cartService.getCartDataLength();
      this.totalPaymentAmount = this.paymentService.calculatePaymentAmount()

      if (this.productsData)
        this.loading = false;

    }, constants.DEFAULT_DELAY);

  }
  
  /**
   * @description function that handles edit the product data 
   * @param product 
   */
  editProduct(product) {

    let dialogRef = this.openDialog.open({
      component: EditOrAddProductComponent,
      content: { productData: product, editOrAddFlag: 'edit' },
      title: "Edit Product",
      closeButtonName: "close"
    },
    )

    /**
     * subscribe to after closed event to get the updated products to update our page 
     */
    dialogRef.afterClosed().subscribe(products => {
      if (products) {
        this.productsData = products;
        this.totalPaymentAmount = this.paymentService.calculatePaymentAmount()
      }
    })
  }

  /**
   * @description function that handles addition for the new product
   */
  addProduct() {

    let dialogRef = this.openDialog.open({
      component: EditOrAddProductComponent,
      content: { editOrAddFlag: 'add' },
      title: "Add Product",
      closeButtonName: "close"
    },
    )
    dialogRef.afterClosed().subscribe(products => {
      if (products)
        this.productsData = products;
    })
  }

  /**
   * @description function that handles adding new product to our cart 
   * @param product 
   */
  addProductToCart(product: IProducts, ) {

    //validate that the item have enough store to be added in the cart
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

    this.loading = true;

    setTimeout(() => {

      this.cartData = this.cartService.postCartData(cartParams, product.productId)
      this.totalCartLength = this.cartService.postCartDataLength(quantity)
      this.totalPaymentAmount = this.paymentService.calculatePaymentAmount()

      this.loading = false;
    }, constants.DEFAULT_DELAY)
  }

}
