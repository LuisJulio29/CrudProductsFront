import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Product } from '../products/interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]> (this.apiUrl);
  }

  getProduct(id:number): Observable<Product> {
    return this.http.get<Product> (`${this.apiUrl}/${id}`);
  }

  createProduct(product:Partial<Product>): Observable<Product> {
    return this.http.post<Product> (this.apiUrl, product);
  }

  updateProduct(id:number, product:Partial<Product>): Observable<Product> {
    return this.http.put<Product> (`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id:number): Observable<void> {
    return this.http.delete<void> (`${this.apiUrl}/${id}`);
  }

}
