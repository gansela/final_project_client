import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { ModelService } from '../model/model.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userName: Subject<string>;
  private cartStatus: Subject<object>;
  public basePath = "http://localhost:4444/"
  constructor(private http: HttpClient, private modelService: ModelService) {
    this.userName = new Subject<string>();
    this.cartStatus = new Subject<object>();
  }
  changeUserName(data) {
    this.userName.next(data)
  }

  changeCartStatus(data) {
    this.cartStatus.next(data)
  }

  getUserName(): Observable<string> {
    return this.userName
  }

  getCartStatus(): Observable<object> {
    return this.cartStatus
  }

  async postLogIn(data) {
    const { basePath } = this
    const uri = `${basePath}auth/log`
    const res: any = await this.http.post(uri, data).toPromise()
    if (res.err) {
      this.changeUserName("Guest")
      this.changeCartStatus({ status: "", data: {} })
    }
    else {
      const userchange = data.email.split("@")
      this.changeUserName(userchange[0])
      this.changeCartStatus(res.cart)
    }
    return res
  }

  async postRegister(data) {
    const { basePath } = this
    const uri = `${basePath}auth/reg`
    const res: any = await this.http.post(uri, data).toPromise()
    if (res.err) {
      this.changeCartStatus("")
      this.modelService.changeModel("registration failed")
    }
    this.changeCartStatus({ status: "new user", data: {} })
    return res
  }

  async verifyID(id){
    const { basePath } = this
    const uri = `${basePath}auth/id`
    const res: any = await this.http.post(uri, {id}).toPromise()
    if (res.err) {
      this.modelService.changeModel(res.msg)
      return false
    }
    return true
  }

  async postVerify() {
    const { basePath } = this
    const uri = `${basePath}store/verify`
    const res: any = await this.http.post(uri, {}).toPromise()
    if (!res.err) {
      this.changeUserName(res.email)
      this.changeCartStatus(res.cart)
    } else {
      this.changeUserName("Guest")
      this.changeCartStatus({ status: "", data: {} })
    }
    return res
  }

  async getCities() {
    const { basePath } = this
    const uri = `${basePath}auth/cities`
    const res: any = await this.http.get(uri).toPromise()
    if (res.err) return this.modelService.changeModel(res.msg)
    return res.cities
  }
}
