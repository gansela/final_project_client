import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private cart: Subject<object>
  private cartRef
  private products: Subject<object>;
  public basePath = "http://localhost:4444/"
    constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
    this.cart = new Subject<object>();
    this.products = new Subject<object>();
  }

  changeCart(data) {
    this.cartRef = data
    this.cart.next(data)
  }

  getCart(): Observable<object> {
    return this.cart
  }

  initCart() {
    this.authService.getCartStatus().subscribe((value: any) => {
      if (value.status === "no" || value.status === "new user") {
        const date_of_creation = new Date
        this.changeCart({ cart_items: [], date_of_creation, total_price: 0 })
      } else this.changeCart(value.data)
    });
  }

  changeProducts(data) {
    this.products.next(data)
  }

  getProducts(): Observable<object> {
    return this.products
  }

  async getProductsFromServer() {
    const { basePath } = this
    console.log("store")
    const uri = `${basePath}store/products`
    const res: any = await this.http.get(uri).toPromise()
    if (!res.err) {
      this.changeProducts(res.products)
    } else {
      this.changeProducts({})
      this.router.navigate(["/home"])
    }
    return res
  }

  addToCart(prod) {
    const { amount, price: unit_price, name, _id: product_id, per_kg } = prod
    const { cart_items } = this.cartRef
    const newProdPrice = Math.round((unit_price * amount + Number.EPSILON) * 10) / 10
    const newProd = { product_id, name, amount, per_kg, price: newProdPrice }
    const newTotalPrice = this.calculatePrice([...cart_items, newProd])
    this.changeCart({ ...this.cartRef, total_price: newTotalPrice, cart_items: [...cart_items, newProd] })
    this.updateCart()
  }

  calculatePrice(items) {
    return items.reduce((calc, item) => {
      return calc + item.price
    }, 0)
  }

  removeFromCart(prod) {
    const { cart_items } = this.cartRef
    const index = cart_items.findIndex(item => item.product_id === prod.product_id && item.price === prod.price)
    if (index < 0) return
    cart_items.splice(index, 1)
    const newTotalPrice = this.calculatePrice(cart_items)
    this.changeCart({ ...this.cartRef, total_price: newTotalPrice, cart_items })
    this.updateCart()
  }

  deleteCart() {
    this.changeCart({ ...this.cartRef, total_price: 0, cart_items: [] })
    this.updateCart()
  }

  updateCart() {
    const { basePath, cartRef } = this
    const uri = `${basePath}store/cart`
    this.http.post(uri, { clientCart: cartRef }).toPromise()
      .then((res: any) => {
        if (res.err) this.router.navigate(["/home"])
        console.log(res)
      })
  }

  async postOrder(data) {
    const { basePath, cartRef } = this
    const uri = `${basePath}store/order`
    const res: any = await this.http.post(uri, data).toPromise()
    if (!res.err) {
      console.log(res)
    } else {
      console.log(res)
    }
    return res
  }

  sendRecipt(data) {
    const { basePath } = this
    const uri = `${basePath}store/recipt`
    this.http.post(uri, data, {responseType: 'text'}).toPromise()
      .then((res: any) => {
        this.downLoadFile(res, "application/text")
      })
  }
  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }

   async getHomePageProduct(){
    const { basePath } = this
    console.log("store")
    const uri = `${basePath}homepage/products`
    const res: any = await this.http.get(uri).toPromise()
    if (!res.err) {
      return res
    } 
    alert("network error, try later")
    return
  }

  async getOrderDates(){
    const { basePath } = this
    console.log("store")
    const uri = `${basePath}store/orderdates`
    const res: any = await this.http.get(uri).toPromise()
    console.log(res)
    if (!res.err) {
      return res.date
    } 
    alert("network error, try later")
    return []
  }
}
