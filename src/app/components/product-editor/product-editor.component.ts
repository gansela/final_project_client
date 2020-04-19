import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { FormBuilder, Validators } from "@angular/forms"
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.css']
})
export class ProductEditorComponent implements OnInit, OnDestroy {
  public product
  public prodRef
  public subscription = new Subscription()
  public isNewProduct: boolean
  public keys
  public errMsg
  public editName
  public newForm
  public categoriesArray
  constructor(private formBuilder: FormBuilder, private adminService: AdminService, ) {
    this.product = {}
    this.isNewProduct = false
    this.keys = []
    this.errMsg = ""
    this.editName = ""
    this.newForm = this.formBuilder.group({
      name: ["", Validators.required],
      price: [null, [Validators.maxLength(4), Validators.required, Validators.pattern('[0-9]*')]],
      image: ["", [Validators.minLength(10), Validators.required]],
      per_kg: [null, Validators.required],
      category: ["", Validators.required]
    })
  }

  async ngOnInit() {
    this.subscription = this.adminService.getProduct().subscribe((value: any) => {
      console.log(value)
      this.product = { ...value }
      this.prodRef = value
      this.keys = Object.keys(this.product).filter(key => key !== "__v")
    });
    const categoriesFromServer = await this.adminService.getCategories()
    this.categoriesArray = categoriesFromServer
    console.log(this.categoriesArray)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  newProduct() {
    this.isNewProduct = true
  }

  openForm(key) {
    if (key === "_id") this.errMsg = "can't change Product id"
    this.editName = key
  }

  changeValues(val) {
    const { editName, product } = this
    product[editName] = val
    console.log(val)
    if (editName === "image") {
      if (val.length < 12){
        this.errMsg = "real image required"
      }else this.errMsg = ""
    } 
    else if (!val && val !== false){
      this.errMsg ="field required"
    } else this.errMsg = ""
    // const x = equals(product, this.prodRef )
  }

}
