import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms"
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  public subscription = new Subscription()
  public logInForm
  public cartStatus
  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.cartStatus = ""
    this.logInForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.minLength(6), Validators.required]]
    })
  }

   async ngOnInit() {
    this.subscription = this.authService.getCartStatus().subscribe((value : any) => {
      const { status }  = value
      if (!value) this.cartStatus = status
      else if (status === "new user" || status === "no") this.cartStatus = "Start Shopping"
      else if (status === "yes") this.cartStatus = "resume shopping"
    });
    const res: any = await this.authService.postVerify()
    // console.log(res)
    if (res.err) {
      alert(res.msg)
      return sessionStorage.setItem('token', "")
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  async logInFunc() {
    const { value } = this.logInForm
    const res: any = await this.authService.postLogIn(value)
    // console.log(res)
    if (!res) return alert("network error")
    if (res.err) {
      sessionStorage.setItem('token', "")
      return alert("authentication error")
    }
    alert("welcome back")
    sessionStorage.setItem('token', res.token);
    this.logInForm.reset()
  }

  get email() {
    return this.logInForm.get("email")
  }

  get password() {
    return this.logInForm.get("password")
  }


}
