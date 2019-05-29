import { Injectable } from '@angular/core';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private cartService: CartService) { }

  calculatePaymentAmount() {

    let totalAmount: number = 0
    let cartData = this.cartService.getCartData();

    Object.keys(cartData).forEach(key => {
      totalAmount += cartData[key].price * cartData[key].quantity
    })

    return totalAmount

  }
}
