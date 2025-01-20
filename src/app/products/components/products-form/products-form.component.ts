import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder,FormGroup,Validators} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ProductService } from '../../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-form',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.css'
})
export class ProductsFormComponent {
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);
  public router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private route = inject(ActivatedRoute);


  productForm:FormGroup;
  isEditMode:boolean = false;

  constructor(){
    this.productForm = this.fb.group({
      id:[null],
      name:['',Validators.required],
      description:['',Validators.required],
      stock:['',[Validators.required,Validators.min(0)]]
    })

    this.route.params.subscribe((params)=>{
      if(params['id']){
        this.isEditMode = true;
        this.loadProduct(params['id']);
      }
    });
}

  private loadProduct(id:number){
    this.productService.getProduct(id).subscribe({
      next: (product)=> {
        this.productForm.patchValue(product);
      },
      error:(error)=>{
        this.snackBar.open('Product not found','Error',{
          duration:2000
        });
      }
    })
  }
  
  onSubmit(){
    if(this.productForm.invalid) return;

    const productData = {...this.productForm.value};
    if(this.isEditMode){
      this.productService.updateProduct(productData.id,productData).subscribe({
        next:()=>{
          this.snackBar.open('Product updated','Success',{
            duration:3000
          });
          this.router.navigate(['/']);
        },
        error:(error)=>{
          this.snackBar.open('Error updating product','Error',{
            duration:2000
          });
        }
      });
    }else{

      delete productData.id;
      this.productService.createProduct(productData).subscribe({
        next:()=>{
          this.snackBar.open('Product created','Success',{
            duration:3000
          });
          this.router.navigate(['/']);
        },
        error:(error)=>{
          this.snackBar.open('Error creating product','Error',{
            duration:2000
          });
        }
      });
    }
  }
}