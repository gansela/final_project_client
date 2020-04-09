import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, Validators } from "@angular/forms"
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public page
  public registerForm1
  public registerForm2
  public citiesArray
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.page = 1
    this.registerForm1 = this.formBuilder.group({
      id: [null, [Validators.minLength(8), Validators.required, Validators.pattern('[0-9]*')]],
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.minLength(6), Validators.required]],
      passwordConfirm: ["", [Validators.minLength(6), Validators.required]],
    }, { validator: this.checkPasswords })
    this.registerForm2 = this.formBuilder.group({
      place_of_residence: [null, Validators.required],
      street: ["", Validators.required],
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
    })
  }

  async ngOnInit() {
    const citiesFromServer = await this.authService.getCities()
    this.citiesArray = citiesFromServer
  }

  movePage(num) {
    this.page = num
  }

  async postRegister() {
    const { value: val1 } = this.registerForm1
    const { value: val2 } = this.registerForm2
    // console.log(val1, val2)
    const res: any = await this.authService.postRegister({ ...val1, ...val2 })
    // console.log(res)
    if (!res) return alert("network error")
    if (res.err) {
      return alert("registration Error")
    }
    alert("registration completed")
    this.registerForm1.reset()
    this.registerForm2.reset()
    this.router.navigate(["/home"])
  }

  get email() {
    return this.registerForm1.get("email")
  }

  get password() {
    return this.registerForm1.get("password")
  }

  get id() {
    return this.registerForm1.get("id")
  }

  get passwordConfirm() {
    return this.registerForm1.get("passwordConfirm")
  }

  get place_of_residence() {
    return this.registerForm2.get("place_of_residence")
  }

  get street() {
    return this.registerForm2.get("street")
  }

  get first_name() {
    return this.registerForm2.get("first_name")
  }

  get last_name() {
    return this.registerForm2.get("last_name")
  }

  checkPasswords(registerForm1) {
    let pass = registerForm1.get('password').value;
    let confirmPass = registerForm1.get('passwordConfirm').value;

    return pass === confirmPass ? null : { notSame: true }
  }
}
