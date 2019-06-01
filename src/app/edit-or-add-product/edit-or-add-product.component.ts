
/**
 * @deprecated this component will decide which operation will be held on products ( add or edit) based on some flag
 * will be passed it since the template page for the 2 operations are the same 
 */

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalData } from '../OpenDialogt/modal-data.interface';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
import { IProducts } from '../intefaces/IProducts';
import { ProductService } from '../services/product.service';
import { MenuComponent } from '../menu/menu.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-or-add-product',
  templateUrl: './edit-or-add-product.component.html',
  styleUrls: ['./edit-or-add-product.component.css']
})
export class EditOrAddProductComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<EditOrAddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private fb: FormBuilder,
    public sanitizer: DomSanitizer,
    private productService: ProductService
  ) { }


  editOrAddFlag: string = this.data.content.editOrAddFlag
  productData: IProducts = this.editOrAddFlag == 'edit' ? this.data.content.productData : {}
  editOrAddProductForm: FormGroup;
  addProductImage = "/assets/images/apple.png"
  ngOnInit() {


    this.editOrAddProductForm = this.fb.group({
      'name': [this.productData.name, [Validators.required, Validators.pattern(new RegExp("^[a-zA-Z -]*$"))]],
      'price': [this.productData.price, [Validators.required, Validators.pattern(new RegExp(/^\d*\.?\d*$/))]],
      'servingSize': [this.productData.servingSize, [Validators.required]],
      'amountleft': [this.productData.amountleft, [Validators.required, Validators.pattern(new RegExp(/^\d*\.?\d*$/))]],
      'photo': [this.productData.photo || this.addProductImage],

    });
  }

  editOrAddProduct(formValue) {

    if (this.editOrAddFlag == 'edit')
      this.editProduct(formValue)

    else
      this.addProduct(formValue)


  }


  addProduct(formValue) {

    if (this.editOrAddProductForm.invalid)
      return;

    let productsData = this.productService.productsListing();

    let addProductObj = {
      productId: productsData.length + 1,
      ...formValue
    }
    let products = this.productService.addProduct(addProductObj)
    this.dialogRef.close(products);

  }


  editProduct(formValue) {

    if (this.editOrAddProductForm.invalid)
      return;

    let editProductObj = {
      productId: this.productData.productId,
      product: formValue
    }
    let products = this.productService.editProduct(editProductObj)
    this.dialogRef.close(products);
  }

}
