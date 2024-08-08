import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Product } from '../_models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient)
  baseurl = environment.apiUrl;



  loadProducts(){
    return this.http.get<Product[]>(this.baseurl+"Product")
  }

  updateProduct(product:Product){
    return this.http.put(this.baseurl+"Product/Update",product)
  }

  removeProduct(id:number){
    return this.http.delete(this.baseurl+"Product/RemoveProduct/"+id)
  }

  addProduct(product:Product){
    return this.http.post(this.baseurl+"Product/Add" , product)
  }
}
