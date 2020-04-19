import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { StoreService } from 'src/app/services/store/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  @Input() role: string;
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
