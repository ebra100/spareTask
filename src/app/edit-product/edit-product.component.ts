import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalData } from '../OpenDialogt/modal-data.interface';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
import { IProducts } from '../intefaces/IProducts';
import { ProductService } from '../services/product.service';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  productData: IProducts = this.data.content
  editProductForm: FormGroup;

  ngOnInit() {

    this.editProductForm = this.fb.group({
      'name': [this.productData.name, [Validators.required, Validators.pattern(new RegExp("^[a-zA-Z -]*$"))]],
      'price': [this.productData.price, [Validators.required, Validators.pattern(new RegExp(/^\d*\.?\d*$/))]],
      'servingSize': [this.productData.servingSize, [Validators.required]],
      'amountleft': [this.productData.amountleft, [Validators.required, Validators.pattern(new RegExp(/^\d*\.?\d*$/))]],

    });
  }

  close() {
    let products = this.productService.productsListing()
    this.dialogRef.close(products);
  }

  editProduct(formValue) {

    if (this.editProductForm.invalid)
      return;

    let editProductObj = {
      productId: this.productData.productId,
      product: formValue
    }
    let products = this.productService.editProduct(editProductObj)
    this.close();

  }
}
