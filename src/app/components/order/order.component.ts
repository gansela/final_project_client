import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { StoreService } from 'src/app/services/store/store.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from "@angular/forms"
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

export interface DialogData {
  mathod: string;
  cart_id: string;
  email: string;
  file: string
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public orderForm
  public imgNameArray
  public products
  public cartPrice
  public cart_id
  public searchText
  public citiesArray
  public details
  public bindStreet = ""
  public bindCity = null
  minDate: Date;
  maxDate: Date;
  public mathod = ""
  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private storeService: StoreService, private authService: AuthService, private router: Router) {
    this.orderForm = this.formBuilder.group({
      city: [null, [Validators.required]],
      street: ["", [Validators.required]],
      date_of_shipping: [null, [Validators.required]],
      credit_card: [null, [
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$')]
      ]
    })
    this.cart_id = ""
    this.products = []
    this.cartPrice = 0
    this.searchText = ""
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth()
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 0, currentMonth + 3);
  }

  async ngOnInit() {
    const res: any = await this.authService.postVerify()
    if (res.err) {
      sessionStorage.setItem('token', "")
      this.router.navigate(["/home"])
    }
    const { cart_items, total_price, _id } = res.cart.data
    this.cart_id = _id
    this.products = cart_items
    this.details = res.details
    console.log(this.details)
    this.cartPrice = total_price
    this.imgNames()
    this.authService.getCities()
      .then(res => {
        this.citiesArray = res
        console.log(res)
      })
  }

  imgNames() {
    this.imgNameArray = this.products.map((prod) => {
      if (!prod.name.includes(" ")) return prod.name
      const prodNameSplit = prod.name.split(" ")
      return prodNameSplit.join("-")
    })
  }

  loadSavedData(val, input) {
    if (input === "street") this.bindStreet = val
    if (input === "city") this.bindCity = val
  }
  async postOrder() {
    const { value } = this.orderForm
    const { cart_id, cartPrice: total_price } = this
    console.log(value)
    const result = await this.storeService.postOrder({ ...value, cart_id, total_price })
    if (!result.err) {
      this.router.navigate(["/home"])
    }
    this.openDialog(result.cart_id)
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 5 && day !== 6;
  }

  get city() {
    return this.orderForm.get("city")
  }

  get street() {
    return this.orderForm.get("street")
  }

  get date_of_shipping() {
    return this.orderForm.get("date_of_shipping")
  }

  get credit_card() {
    return this.orderForm.get("credit_card")
  }

  openDialog(cart_id): void {
    const dialogRef = this.dialog.open(OrderDialog, {
      width: '350px',
      data: { mathod: this.mathod, cart_id, email: "email", file: "file" },
      panelClass: "formFieldWidth480"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.mathod = result;
      this.router.navigate(["/home"])
    });
  }

}



@Component({
  selector: 'order-dialog',
  templateUrl: 'order-dialog.html',
  styleUrls: ['./order.component.css']
})
export class OrderDialog {

  constructor(
    public dialogRef: MatDialogRef<OrderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private storeService: StoreService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeMathod(val) {
    const { cart_id } = this.data
    this.storeService.sendRecipt({ mathod: val, cart_id })
  }
}
