import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms"
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ModelService } from 'src/app/services/model/model.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  public subscription = new Subscription()
  public logInForm
  public cartStatus
  public SpanStatus = "welcome to your first purchuse"
  public cartPrice
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private modelService: ModelService) {
    this.cartStatus = ""
    this.cartPrice = 0
    this.logInForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.minLength(6), Validators.required]]
    })
  }

  async ngOnInit() {
    this.subscription = this.authService.getCartStatus().subscribe((value: any) => {
      if (value.redirect) this.router.navigate(["/admin"])
      const { status, data } = value
      if (!status) {
        this.cartStatus = ""
        this.SpanStatus = "welcome to your first purchuse"
      }
      else if (status === "new user") {
        this.cartStatus = "Start Shopping"
      } else if (status === "no") {
        this.cartStatus = "Start shopping"
        this.SpanStatus = "You have no open cart"
      } else if (status === "yes") {
        this.cartStatus = "resume shopping"
        this.SpanStatus = `You an open cart totaling: ${data.total_price}₪`
      }
    });
    const res: any = await this.authService.postVerify()
    if (res.err) {
      this.modelService.changeModel(res.msg)
      return sessionStorage.setItem('token', "")
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  async logInFunc() {
    const { value } = this.logInForm
    const res: any = await this.authService.postLogIn(value)
    if (!res) return this.modelService.changeModel("network error")
    if (res.err) {
      sessionStorage.setItem('token', "")
      return this.modelService.changeModel("authentication error")
    }
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
