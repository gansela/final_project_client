import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms"
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public logInForm
  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.logInForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required] ],
      password: ["", [Validators.minLength(6), Validators.required]]
    })
  }

  ngOnInit() {
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

  get email(){
    return this.logInForm.get("email")
  }

  get password(){
    return this.logInForm.get("password")
  }


}
