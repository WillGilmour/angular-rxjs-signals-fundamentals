import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Just enough here for the code to compile
  private productsUrl = 'api/products';
  private http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(tap((res)=>{
      console.log('in http.get pipeline', res)
    }));
  }

  getProduct(id:number): Observable<Product> {
    const productUrl = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(productUrl).pipe(tap((res)=>{
      console.log('in http.get by id pipeline', res)
    }));
  }
}
