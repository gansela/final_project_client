import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreService } from 'src/app/services/store/store.service';
import { AdminService } from 'src/app/services/admin/admin.service';


export interface DialogData {
  amount: number;
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() productObj: any
  @Input() role: string;
  amount: number = 0;
  constructor(public dialog: MatDialog, private storeService: StoreService, private adminService: AdminService) { }


  ngOnInit() {
  }

  adminEdit() {
    if (this.role !== "admin") return
    this.adminService.changeProduct(this.productObj)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProductCardDialog, {
      width: '250px',
      data: { amount: this.amount, name: this.productObj.name, per: this.productObj.per_kg, price: this.productObj.price },
      panelClass: "formFieldWidth480"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.amount = result;
      if (result) {
        if (result > 10) alert(" you can purchess maximum 10 units")
        else this.storeService.addToCart({ ...this.productObj, amount: result })
      }
    });
  }

}

@Component({
  selector: 'product-card-dialog',
  templateUrl: 'product-card-dialog.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardDialog {

  constructor(
    public dialogRef: MatDialogRef<ProductCardDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
