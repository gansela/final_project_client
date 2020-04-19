import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbar, MatFormFieldModule, MatInputModule, MatCardModule } from "@angular/material";
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list'

import { InterceptorService } from './services/interceptor/interceptor.service';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ShopComponent } from './components/shop/shop.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoryPipe } from './pipes/category/category.pipe';
import { ProductCardComponent, ProductCardDialog } from './components/product-card/product-card.component';
import { SearchPipe } from './pipes/search/search.pipe';
import { CartCardComponent } from './components/cart-card/cart-card.component';
import { OrderComponent, OrderDialog } from './components/order/order.component';
import { HighlightDirective } from './directives/highlight/highlight.directive';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { ProductEditorComponent } from './components/product-editor/product-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    MatToolbar,
    AuthComponent,
    HomeComponent,
    RegisterComponent,
    ShopComponent,
    CartComponent,
    ProductsComponent,
    CategoryPipe,
    ProductCardComponent,
    ProductCardDialog,
    SearchPipe,
    CartCardComponent,
    OrderComponent,
    HighlightDirective,
    OrderDialog,
    AdminHomeComponent,
    ProductEditorComponent,
  ],
  entryComponents: [
    ProductCardDialog,
    OrderDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule
  ],
  providers: [InterceptorService,
    { useClass: InterceptorService, provide: HTTP_INTERCEPTORS, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
