import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //validate token..
    // const token = localStorage.getItem("token");
    // if (typeof token !== 'string') return null;
    const token = sessionStorage.getItem("token")
    const newRequest = request.clone({
      headers: request.headers.set("session", token)
    });
    return next.handle(newRequest)

  }
}
