import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
let constants = require('../Constants/Constants.json');

@Component({
  selector: 'app-menu-or-view-cart',
  templateUrl: './menu-or-view-cart.component.html',
  styleUrls: ['./menu-or-view-cart.component.css']
})
export class MenuOrViewCartComponent implements OnInit {

  constructor() { }

  @Input() menu?: boolean;
  @Input() cart?: boolean
  @Input() headerText: string;
  @Input() headerIcon: string;
  @Input() totalPaymentAmount: number;
  @Input() totalCartLength: number
  @Input() items: any[]
  @Input() cartData: any

  @Output() headerAction = new EventEmitter()
  @Output() editItemAction = new EventEmitter()
  @Output() increaseQuantityAction = new EventEmitter()
  @Output() decreaseQuantityAction = new EventEmitter()
  @Output() addItemAction = new EventEmitter()
  @Output() removeItemsAction = new EventEmitter()

  breakpoint: any;
  loading: boolean = true

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= constants.DEFAULT_BREAK_POINT) ? 1 : 3;

    console.log(this.items);

    if (this.items)
      this.loading = false

  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= constants.DEFAULT_BREAK_POINT) ? 1 : 3;
  }

  addProductToCart(item) {

    this.increaseQuantityAction.emit(item)
  }

  addProduct() {

    this.headerAction.emit()
  }

  editProduct(item) {
    this.editItemAction.emit(item)
  }

  deleteProductFromCart(item) {
    this.decreaseQuantityAction.emit(item)
  }

}
