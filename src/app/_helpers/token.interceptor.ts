import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginServiceService } from '../_service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor( private authenticationService: LoginServiceService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.authenticationService.getToken()}`
            }
        });

        return next.handle(request);
    }
}