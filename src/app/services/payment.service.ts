import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private cartService: CartService,
    private productService: ProductService) { }

  calculatePaymentAmount() {

    let totalAmount: number = 0
    let cartData = this.cartService.getCartData();

    Object.keys(cartData).forEach(key => {
      let product = this.productService.getProductById(cartData[key].productId)
      totalAmount += +product.price * +cartData[key].quantity
    })

    return totalAmount

  }
}
