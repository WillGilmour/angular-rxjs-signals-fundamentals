import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { NgIf, NgFor, NgClass } from '@angular/common';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';
import { catchError, EMPTY, map, Subscription } from 'rxjs';

@Component({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    standalone: true,
  imports: [NgIf, NgFor, NgClass, ProductDetailComponent]
})
export class ProductListComponent implements OnInit, OnDestroy{
  // Just enough here for the template to compile

  private productService = inject(ProductService);
  private productSub!:Subscription;

  // Products
  products: Product[] = [];

  // Selected product id to highlight the entry
  selectedProductId: number = 0;


  pageTitle = 'Products';
  errorMessage = '';


  ngOnInit(): void {
     this.productSub = this.productService.getProducts().pipe(
      map((products:Product[]) => {
      this.products = products;
    }), catchError(err => {this.errorMessage = err; return EMPTY})).subscribe()
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe()
  }

  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }
}
