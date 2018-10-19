import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { CoreService } from '../../services/core.service'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private coreService: CoreService) {
  }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.match('/')) {
      req = req.clone({
        url: this.coreService.url + 'api' + req.url,
        headers: req.headers.set('Content-Type', 'application/json')
      });
      if (req.url.match('/login')) {
        const user = req.body;
        req = req.clone({
          headers: req.headers.set('Content-Type', 'application/json')
        });
      } else {
        if(!this.authService.accessTokenId){
          alert('Session has expired!');
        }
        req = req.clone({
          headers: req.headers.set('Authorization', this.authService.accessTokenId)
        });

      }
      return next.handle(req).pipe(
        tap(event => {
        }, err => {
          if (err.status === 401 && this.router.url !== '/login') {
            alert('Session Timeout');
            localStorage.$SW$URL = this.router.url;
            this.authService.clearUser();
            this.authService.clearStorage();
            return this.router.navigate(['/login']);
          }
        }));
    } else {
      return next.handle(req);
    }
  }
}
