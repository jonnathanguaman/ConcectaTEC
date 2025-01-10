import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

  constructor(private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error:HttpErrorResponse) =>{
        if (error.status === 0 || error.status >= 400 && error.status <= 500) {
          // Error del lado del cliente o red
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('id');
        } 
        return throwError("");
      })
    );
  }
}
