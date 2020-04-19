import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit, OnDestroy {
  public subscription = new Subscription()
  public verified
  constructor(private adminServise: AdminService) {
    this.verified = false
  }

  ngOnInit() {
    this.adminServise.initAdmin()
    this.subscription = this.adminServise.getVerification().subscribe((value: any) => {
      this.verified = value
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
