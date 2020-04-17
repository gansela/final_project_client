import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.css']
})
export class CartCardComponent implements OnInit {
  @Input() cartObj: any
  constructor(private storeService: StoreService) { }

  ngOnInit() {
  }

  removeItem(){
    this.storeService.removeFromCart(this.cartObj)
  }


}
