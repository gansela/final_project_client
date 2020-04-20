import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelService } from 'src/app/services/model/model.service';
import { Subscription } from 'rxjs';

export interface DialogData {
alert:string
}

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  public subscription = new Subscription()
  constructor(public dialog: MatDialog, private modelService:ModelService) { }

  ngOnInit() {
    this.subscription = this.modelService.getModel().subscribe((value: any) => {
      this.openDialog(value)
    });
  }

  openDialog(_alert) {
    const dialogRef = this.dialog.open(GlobalDialog, {
      width: '300px',
      data: { alert: _alert },
      panelClass: "formFieldWidth480"
    });

  }
}
@Component({
  selector: 'global-dialog',
  templateUrl: 'global-dialog.html',
  styleUrls: ['./model.component.css']
})
export class GlobalDialog {

  constructor(
    public dialogRef: MatDialogRef<GlobalDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
