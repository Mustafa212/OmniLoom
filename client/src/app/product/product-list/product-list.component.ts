import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../_models/Product';
import { ProductService } from '../../_services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SalesComponent } from "../../_lottie/sales/sales.component";
import AOS from 'aos';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, SalesComponent , NgIf , ReactiveFormsModule ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  private productService = inject(ProductService);
  accountService = inject(AccountService)
  private toast = inject(ToastrService)
  isModalVisible = false;
  productForm: FormGroup = new FormGroup([])
  productUForm: FormGroup = new FormGroup([])
  updatedProd?:Product
  private fb = inject(FormBuilder)


  ngOnInit(): void {
    this.loadProducts();
    AOS.init({
      once:true
    });
    this.productForm = this.fb.group({
      name: ['' ,  Validators.required],
      brand: ['',  Validators.required],
      price: ['',  Validators.required],
      photoUrl: ['',  Validators.required]
    });

  
      
    
  }
  loadProducts() {
    this.productService.loadProducts().subscribe({
      next: (prod) => {
        this.products = prod;
        console.log(prod);
        
      },
    });
  }



  openModal() {
    this.isModalVisible = true;
    

  }

  closeModal() {
    this.isModalVisible = false;
  }
  closeUModal() {
    this.accountService.isUModalVisible.set(false)
  }

  saveProduct() {
    if (this.productForm.valid) {
      const newProduct = this.productForm.value;

      this.closeModal();

      this.productService.addProduct(newProduct).subscribe({
        next:(_)=>{
          this.loadProducts()
        },
        error:_ => console.log("something baddddddddddddd happend")
        
      })
    }
  }


  deleteProduct(event:number){

    this.productService.removeProduct(event).subscribe({
      next:()=>{
        this.toast.info("deleted Successfully")
        this.loadProducts()
      },
      error:error => console.log(error)
      
    })

  }


  updateProduct(){
    if (this.productUForm.valid) {
      const updatedProduct: Product = this.productUForm.value;

      const matchingProduct = this.products.find(product => product.name === this.updatedProd!.name);

      if (matchingProduct) {
          const id = matchingProduct.id;
          updatedProduct.id = id;  

          this.productService.updateProduct(updatedProduct).subscribe({
              next: () => {
                  this.toast.success('Updated Successfully');
                  this.closeUModal();
                  this.loadProducts();
              },
              error: e => console.log(e)
          });
      } else {
          console.log('Product with the given name not found');
      }
  }
}
  

  ss(event:Product){
    this.updatedProd = event
    this.productUForm = this.fb.group({
      name: [this.updatedProd?.name ,  Validators.required],
      brand: [this.updatedProd?.brand,  Validators.required],
      price: [this.updatedProd?.price,  Validators.required],
      photoUrl: [this.updatedProd?.photoUrl,  Validators.required]
    });
  }

}
