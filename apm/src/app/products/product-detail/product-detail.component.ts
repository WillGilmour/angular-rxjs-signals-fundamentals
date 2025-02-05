import { Component, inject, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { map, Subscription } from 'rxjs';

@Component({
    selector: 'pm-product-detail',
    templateUrl: './product-detail.component.html',
    standalone: true,
    imports: [NgIf, NgFor, CurrencyPipe]
})
export class ProductDetailComponent implements OnChanges, OnDestroy{

  private sub!: Subscription;

  private productService = inject(ProductService)
  // Just enough here for the template to compile
  @Input() productId: number = 0;
  errorMessage = '';

  // Product to display
  product: Product | null = null;

  // Set the page title
  pageTitle = this.product ? `Product Detail for: ${this.product.productName}` : 'Product Detail';

  ngOnChanges(changes: SimpleChanges): void {
    const id = changes['productId'].currentValue;
    if(id) {
      this.sub = this.productService.getProduct(id as number).pipe(
        map((product)=>{
          this.product = product
        })
      ).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  addToCart(product: Product) {
  }
}
