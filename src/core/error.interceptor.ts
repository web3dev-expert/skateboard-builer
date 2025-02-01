import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable } from 'rxjs';
import { authService } from '../services/forms.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (
            (err.error &&
              err.error.message &&
              err.error.message ==
                'Il token non è valido! Per favore effettua nuovamente il login o refresha la pagina!') ||
            (err.error &&
              err.error.message &&
              err.error.message ==
                'Il token non è valido.')
          ) {
            let accessToken = localStorage.getItem('accessToken');
            let refreshToken = localStorage.getItem('refreshToken');
            let location = localStorage.getItem('location');
            if (accessToken) {
              this.authService
                .verifyRefreshToken(refreshToken!)
                .subscribe({
                  next: (tokens: any) => {
                    localStorage.setItem('accessToken', tokens.accessToken);
                    localStorage.setItem('refreshToken', tokens.refreshToken);
                    this.authService.setToken(tokens.accessToken);
                    this.authService
                      .verifyAccessToken(tokens.accessToken)
                      .subscribe({
                        next: (u: any) => {
                          localStorage.setItem(
                            'user',
                            JSON.stringify(u)
                          );
                          this.authService.authenticateUser(true);
                          this.authService.setUser(u);
                          this.router.navigate([`${location || '/home'}`]);
                        },
                      });
                  },
                  error: () => {
                    this.toastr.show("Non è stato possibile verificare la tua identità. Accedi di nuovo.")
                    localStorage.clear()
                  },
                  complete: () => {},
                });
            } 
          } else {
            this.toastr.show(
              err?.error?.message ||
                err?.error?.messageList[0] ||
                err?.message ||
                "E' successo qualcosa nell'elaborazione della richiesta"
            );
          }
        }

        return new Observable<HttpEvent<any>>();
      })
    );
  }
}