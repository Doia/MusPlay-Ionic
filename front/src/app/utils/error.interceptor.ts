import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { AccountService } from '../services/account.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error?.message === 'El token JWT es invalido!') {
          // Verifica si el error es por token expirado
          if (error.error.error.includes('expired') && !this.isRefreshing) {
            this.isRefreshing = true;
            
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                localStorage.removeItem('refreshToken');  

                return from(this.accountService.refreshToken(refreshToken)).pipe(
                    switchMap((newToken: any) => {
                    if (newToken && newToken.token) {
                        // Guarda el nuevo token y refresca la solicitud
                        localStorage.setItem('token', newToken.token);
                        localStorage.setItem('refreshToken', newToken.refreshToken);
                        this.isRefreshing = false;

                        // Clona la solicitud original y le añade el nuevo token de autorización
                        request = request.clone({
                            setHeaders: { Authorization: `Bearer ${newToken.token}` }
                        });

                        // Reintenta la solicitud con el nuevo token
                        return next.handle(request);
                    } else {
                        this.accountService.logout();
                        return throwError(() => new Error('No se pudo refrescar el token'));
                    }
                    }),
                    catchError((err) => {
                    this.isRefreshing = false;
                    this.accountService.logout();
                    return throwError(() => err);
                    })
                );
            } else {
              this.accountService.logout();
              return throwError(() => new Error('No hay refresh token disponible'));
            }
          }
        } else if ([401, 403].includes(error.status) && this.accountService.userValue) {
          // Logout automático si el error es 401 o 403 y existe un usuario logueado
          this.accountService.logout();
        }

        const errorMsg = error.error?.message || error.statusText;
        console.error(error);
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
