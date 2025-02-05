import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { NgIf, NgFor, NgClass } from '@angular/common';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';
import { map, Subscription } from 'rxjs';

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


  ngOnInit(): void {
     this.productSub = this.productService.getProducts().pipe(
      map((products:Product[]) => {
      this.products = products;
    })).subscribe()
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe()
  }

  pageTitle = 'Products';
  errorMessage = '';


  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }
}
