// token.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginService } from './login.service';
// import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: LoginService
    // ,private toastr:ToastrService
    ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the authentication token from the service.
    const authToken = this.authService.getToken();

    // Clone the original request and add the authorization header.
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }

    // Pass the request to the next handler.
    return next.handle(request).pipe(
      catchError((err:any)=>{
        if (err instanceof HttpErrorResponse){
          if(err.status===401){
            // this.toastr.warning({detail:"warning",summary:"Token is expired,Login"});
          }
        }
        return throwError(()=>new Error("some other error ocured"))
      })
    );
  }
}
