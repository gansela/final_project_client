import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { FormBuilder, Validators } from "@angular/forms"
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.css']
})
export class ProductEditorComponent implements OnInit, OnDestroy {
  public product
  public prodRef
  public submitBtn = false
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
      price: [null, [Validators.max(9999), Validators.required]],
      image: ["", [Validators.minLength(12), Validators.required]],
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
      this.isNewProduct = false
    });
    const categoriesFromServer = await this.adminService.getCategories()
    this.categoriesArray = categoriesFromServer
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
    if (editName === "price"){
      product[editName] = parseInt(val)
    } else product[editName] = val
      if (product.image.length < 12) {
        this.errMsg = "real image required"
        this.submitBtn = false
        return
      } else this.errMsg = ""
      if (!product.name) {
        this.errMsg = "name required"
        this.submitBtn = false
        return
      } else this.errMsg = ""
    if (!val && val !== false) {
      this.errMsg = "field required"
    } else this.errMsg = ""
    console.log(product)
    this.submitBtn = true ? !_.isEqual(product, this.prodRef) && !this.errMsg : false
  }
  updateProduct(){
    const { product, categoriesArray} = this
    const newCategory = categoriesArray.find(cat => cat.name === product.category)
    this.adminService.postUpdatedProduct({...product, category: newCategory._id})
  }

  postProduct(){
    this.adminService.addProduct(this.newForm.value)
  }

  get name() {
    return this.newForm.get("name")
  }

  get category() {
    return this.newForm.get("category")
  }

  get price() {
    return this.newForm.get("price")
  }

  get image() {
    return this.newForm.get("image")
  }

  get per_kg() {
    return this.newForm.get("per_kg")
  }
}
