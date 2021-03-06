import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ShopComponent } from './components/shop/shop.component';
import { OrderComponent } from './components/order/order.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';

interface CustomRoute extends Route {
  children?: Array<CustomRoute>;
  title?: string;
  isVisible?: boolean;
}

 export const routes: Array<CustomRoute> = [
  { path: "home", component: HomeComponent, title: "home", isVisible:true },
  { path: "",  redirectTo: '/home', pathMatch: 'full' },
  { path: "register", component: RegisterComponent, title: "register", isVisible:false },
  { path: "shop", component: ShopComponent, title: "shop", isVisible:false },
  { path: "order", component: OrderComponent, title: "order", isVisible:false },
  { path: "admin", component: AdminHomeComponent, title: "admin", isVisible:false }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
