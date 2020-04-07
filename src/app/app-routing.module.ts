import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';

interface CustomRoute extends Route {
  children?: Array<CustomRoute>;
  title?: string;
  isVisible?: boolean;
}

 export const routes: Array<CustomRoute> = [
  { path: "", component: HomeComponent, title: "home", isVisible:true },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
