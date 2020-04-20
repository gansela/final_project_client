import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StoreService } from '../store/store.service';
import { AuthService } from '../auth/auth.service';
import { ModelService } from '../model/model.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private verified: Subject<boolean>;
  private product: Subject<object>;
  public basePath = "http://localhost:4444/"
  constructor(private http: HttpClient, private router: Router, private storeService: StoreService, private authService: AuthService, private modelService: ModelService) {
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
    const { basePath } = this
    const uri = `${basePath}admin/verify`
    const res: any = await this.http.post(uri, {}).toPromise()
    if (!res.err) {
      this.authService.changeUserName(res.email)
      this.changeVerified(true)
    } else {
      await sessionStorage.setItem('token', "")
      this.changeVerified(false)
      this.router.navigate(["/home"])
    }
    return res
  }

  async getCategories() {
    const { basePath } = this
    const uri = `${basePath}admin/categories`
    const res: any = await this.http.get(uri).toPromise()
    if (res.err) return this.modelService.changeModel(res.msg)
    return res.categories
  }

  async postUpdatedProduct(data) {
    const { basePath } = this
    const uri = `${basePath}admin/updateproduct`
    const res: any = await this.http.post(uri, data).toPromise()
    if (!res.err) {
      this.modelService.changeModel(res.msg)
      this.router.navigate(["/home"])
    }
    this.storeService.getProductsFromServer()
    return
  }

  async addProduct(data) {
    const { basePath } = this
    const uri = `${basePath}admin/addproduct`
    const res: any = await this.http.post(uri, data).toPromise()
    if (!res.err) {
      this.modelService.changeModel(res.msg)
      this.router.navigate(["/home"])
    }
    this.storeService.getProductsFromServer()
    return
  }

  initAdmin() {
    this.postAdminVerify()
    this.storeService.getProductsFromServer()
    return
  }
}



