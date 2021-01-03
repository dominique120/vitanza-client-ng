import { Injectable } from '@angular/core';
import {  HttpRequest,  HttpHandler,  HttpEvent,  HttpInterceptor} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService, private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const reqWithCredentials = req.clone({withCredentials: true});
    return next.handle(reqWithCredentials)
     .pipe(
        catchError(error => {
          if (error.status === 401 || error.status === 403) {
            this.loginService.logout()
            this.router.navigate(["/login"])
          }
          return throwError(error);
        })
     );
  }
}
