import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userName: Subject<string>;
  private cartStatus: Subject<string>;
  public basePath = "http://localhost:4444/"
  constructor(private http: HttpClient) {
    this.userName = new Subject<string>();
    this.cartStatus = new Subject<string>();
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

  getCartStatus(): Observable<string> {
    return this.cartStatus
  }

  async postLogIn(data) {
    const { basePath } = this
    const uri = `${basePath}auth/log`
    const res: any = await this.http.post(uri, data).toPromise()
    if (res.err) {
      this.changeUserName("Guest")
      this.changeCartStatus("")
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
      alert("registration failed")
    }
    this.changeCartStatus("new user")
    return res
  }

  async postVerify() {
    const { basePath } = this
    const uri = `${basePath}store/verify`
    const res: any = await this.http.post(uri, {}).toPromise()
    if (!res.err){
      this.changeUserName(res.email)
      this.changeCartStatus("")
    } 
    this.changeCartStatus(res.cart)
    console.log(res)
    return res
  }

  async getCities() {
    const { basePath } = this
    const uri = `${basePath}auth/cities`
    const res: any = await this.http.get(uri).toPromise()
    if (res.err) return alert(res.msg)
    return res.cities
  }
}
