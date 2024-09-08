import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AccountService } from '../services/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener el token del almacenamiento local
    const token = localStorage.getItem('token');
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    // Verificar si la URL es a la API y no es a la ruta de autenticación
    const isAuthUrl = request.url.startsWith(`${environment.apiUrl}/auth`);

    if (isApiUrl && !isAuthUrl && token) {
      // Clonar la solicitud y añadir el encabezado de autorización si no es una llamada a /auth
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
