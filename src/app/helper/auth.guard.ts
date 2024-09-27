import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { IAuthenticationResponseModel } from "../models/authentication.model";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const UserData: IAuthenticationResponseModel = JSON.parse(localStorage.getItem('UserDataAntrianCIS') as any);

        if (UserData) {
            return true;
        }

        this.router.navigate(['authentication'], { queryParams: { returnUrl: state.url } });
        return true;
    }
}