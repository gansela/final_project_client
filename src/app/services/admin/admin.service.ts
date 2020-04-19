import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StoreService } from '../store/store.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private verified: Subject<boolean>;
  private product: Subject<object>;
  public basePath = "http://localhost:4444/"
  constructor(private http: HttpClient, private router: Router, private storeService: StoreService, private authService: AuthService) {
    this.verified = new Subject<boolean>();
    this.product = new Subject<object>();
  }

  changeVerified(data) {
    this.verified.next(data)
  }

  changeProduct(data) {
    this.product.next(data)
  }

  getVerification(): Observable<boolean> {
    return this.verified
  }

  getProduct(): Observable<Object> {
    return this.product
  }

  async postAdminVerify() {
    console.log("here")
    const { basePath } = this
    const uri = `${basePath}admin/verify`
    const res: any = await this.http.post(uri, {}).toPromise()
    console.log(res)
    if (!res.err) {
      this.authService.changeUserName(res.email)
      this.changeVerified(true)
    } else {
      this.changeVerified(false)
      this.router.navigate(["/home"])
    }
    return res
  }

  async getCategories(){
    const { basePath } = this
    const uri = `${basePath}admin/categories`
    const res: any = await this.http.get(uri).toPromise()
    if (res.err) return alert(res.msg)
    return res.categories
  }

  initAdmin() {
    this.postAdminVerify()
    this.storeService.getProductsFromServer()
    return
  }
}



