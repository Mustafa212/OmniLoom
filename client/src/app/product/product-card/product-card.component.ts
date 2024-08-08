import { Component, inject, input, output, signal } from '@angular/core';
import { Product } from '../../_models/Product';
import {MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AccountService } from '../../_services/account.service';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatButtonModule,MatIconModule ,  NgIf , ReactiveFormsModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent  {
  products = input<Product>();
  prodId = output<number>()
  updatedProd = output<Product>()
  accountService =  inject(AccountService)
  

  setDeletedId(){
    this.prodId.emit(this.products()!.id)
  }



  setUpdatedProd(){
    this.updatedProd.emit(this.products()!)
    this.accountService.isUModalVisible.set(true)

  }
}
