import { Component, OnInit } from '@angular/core';
let products = require('../JsonData/products.json');

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  displayProgressSpinner = true;

  breakpoint: any;
  productsData = products


  ngOnInit() {    
    console.log(this.productsData);
    
    this.breakpoint = (window.innerWidth <= 900) ? 1 : 2;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 900) ? 1 : 2;
  }

}
