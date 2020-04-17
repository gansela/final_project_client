import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from 'src/app/services/store/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  public subscription = new Subscription()
  public products
  public cartPrice
  constructor(private storeService: StoreService) {
    this.products = []
    this.cartPrice = 0
   }

  ngOnInit() {
    this.subscription = this.storeService.getCart().subscribe((value: any) => {
      console.log(value)
      this.products = value.cart_items
      this.cartPrice = value.total_price
    });
    this.storeService.initCart()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
