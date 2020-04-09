import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'online-market-client';
  public userName
  constructor(private authService: AuthService) {
    this.userName = "Guest"
  }

  async ngOnInit() {
    const session = sessionStorage.getItem("token") || ""
    this.authService.getUserName().subscribe((value) => {
      // console.log(value)
      this.userName = value;
    });
    const res: any = await this.authService.postVerify()
    // console.log(res)
    if (res.err) {
      alert(res.msg)
      return sessionStorage.setItem('token', "")
    }

  }
}
