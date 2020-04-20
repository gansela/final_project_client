import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store/store.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public prod = {
    name: "Tomato",
    price: 8,
    per_kg: true,
    image: "http://localhost:4445/tomato.jpg",
    category: "vegetables & fruits"
  }
  public prodNum = 25
  constructor(private storeService: StoreService) {
  }

  async ngOnInit() {
    const res = await this.storeService.getHomePageProduct()
    if (!res) {
      return
    }
    this.prodNum = res.amount
    this.prod = res.product
  }

}
