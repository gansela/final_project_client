import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  public productsSub = new Subscription()
  public products
  public catList
  public searchText
  constructor(private storeService: StoreService, ) {
    this.products = {}
    this.catList = [],
    this.searchText = ""
  }

  ngOnInit() {
    this.productsSub = this.storeService.getProducts().subscribe((value: any) => {
      this.products = value
      console.log(this.products)
      if (this.products.length) {
        this.catList = this.products.reduce((unique, item) =>
          unique.includes(item.category) ? unique : [...unique, item.category,], [])
      }
    });
    this.storeService.getProductsFromServer()
  }


  ngOnDestroy() {
    this.productsSub.unsubscribe()
  }

}
