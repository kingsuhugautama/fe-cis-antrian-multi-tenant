import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IAuthenticationResponseModel } from "../models/authentication.model";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const localStorageData: any = localStorage.getItem('UserDataAntrianCIS');

        const UserData: IAuthenticationResponseModel = JSON.parse(localStorageData)

        if (UserData) {
            const modifiedRequest = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${UserData.token}`
                }
            });
            return next.handle(modifiedRequest);
        } else {
            return next.handle(req);
        }
    }
}