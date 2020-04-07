import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userName: Subject<string>;
  public basePath = "http://localhost:4444/"
  constructor(private http: HttpClient) {
    this.userName = new Subject<string>();
  }
  changeUserName(data) {
    console.log(data + "    here")
    this.userName.next(data)
  }

  getUserName(): Observable<string> {
    return this.userName
  }

  async postLogIn(data) {
    const { basePath } = this
    const uri = `${basePath}auth/log`
    const res: any = await this.http.post(uri, data).toPromise()
    if (res.err) {
      this.changeUserName("Guest")
    }
    else {
      const userchange = data.email.split("@")
      this.changeUserName(userchange[0])
    }
    return res
  }

  async postVerify(session) {
    const { basePath } = this
    const uri = `${basePath}store/verify`
    const res: any = await this.http.post(uri, session).toPromise()
    if (!res.err) this.changeUserName(res.email)
    return res
  }
}
