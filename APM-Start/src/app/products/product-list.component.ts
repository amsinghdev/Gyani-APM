import {Component, OnInit} from '@angular/core';
import {IProduct} from './products';
import {ProductService} from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
   _listFilter: string;
   errorMessage: string;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filterProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filterProducts: IProduct[];
  products: IProduct[];
  ngOnInit(): void {
     this.productService.getProducts().subscribe({
      next: products => {
        this.products = products
        this.filterProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }
  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  private performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  constructor(private productService: ProductService) {
  }
}

