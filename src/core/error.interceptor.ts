import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ShowErrorService } from '../services/show-error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private showError: ShowErrorService
  ) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: any) => {
        setTimeout(() => {
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
              let refreshToken = localStorage.getItem('refreshToken');
              let location = localStorage.getItem('location');
              if (refreshToken) {
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
                    }
                  });
              } else {
                localStorage.clear();
                this.authService.authenticateUser(false);
                this.authService.setUser(null);
                this.authService.setToken('');
                this.router.navigate(['home']);
              }
            } else if (
              err.error &&
              err.error.message &&
              err.error.message ==
              'Il refresh token non è valido. Accedi nuovamente.') {
              localStorage.clear()
            } else {
              let error = null;
              if (null != err?.error?.messageList && err?.error?.messageList.length > 0) {
                error = err?.error?.messageList[0];
              }
              this.toastr.show(
                err?.error?.message ||
                error ||
                err?.message ||
                "E' successo qualcosa nell'elaborazione della richiesta"
              );
            }
          }

          this.showError.emitShowSpinner(false);
        }, 1500)
        return new Observable<HttpEvent<any>>();
      })
    );
  }
}