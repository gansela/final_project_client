import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

   async ngOnInit() {
    const res: any = await this.authService.postVerify()
    if (res.err) {
      sessionStorage.setItem('token', "")
      this.router.navigate(["/home"])
    }
  }

}
