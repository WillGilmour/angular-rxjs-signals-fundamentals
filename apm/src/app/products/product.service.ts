import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Product } from './product';
import { ProductData } from './product-data';
import { HttpErrorService } from '../utilities/http-error.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Just enough here for the code to compile
  private productsUrl = 'api/products';
  private http = inject(HttpClient);
  private errorService = inject(HttpErrorService);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      tap((res)=>{
      console.log('in http.get pipeline', res)
    })
    , catchError(err=>this.handleError(err))
  );
  }

  getProduct(id:number): Observable<Product> {
    const productUrl = `${this.productsUrl}s/${id}`;
    return this.http.get<Product>(productUrl).pipe(tap((res)=>{
      console.log('in http.get by id pipeline', res)
    })
    , catchError(err=>this.handleError(err)));
  }

  private handleError(err: HttpErrorResponse): Observable<never>{
    const formattedMessage = this.errorService.formatError(err);
    return throwError(()=> formattedMessage);
  }
}
