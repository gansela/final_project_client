import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private cart: Subject<object>;
  public basePath = "http://localhost:4444/"
  constructor(private http: HttpClient) { 
    this.cart = new Subject<object>();
  }
}
