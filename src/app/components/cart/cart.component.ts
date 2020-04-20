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
      this.products = value.cart_items
      this.cartPrice = Math.round((value.total_price + Number.EPSILON) * 10) / 10
    });
    this.storeService.initCart()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  clearCart() {
    this.storeService.deleteCart()
  }

}
