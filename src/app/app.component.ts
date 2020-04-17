import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'online-market-client';
  public userName
  public subscription = new Subscription()
  constructor(private authService: AuthService) {
    this.userName = "Guest"
  }

  ngOnInit() {
    this.subscription = this.authService.getUserName().subscribe((value) => {
      this.userName = value;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
