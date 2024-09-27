import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationResponseModel, IAuthenticationResponseModel } from 'src/app/models/authentication.model';
import * as API_CONFIG from '../../api';
import { HttpOperationService } from '../http-operation/http-operation.service';
import { UtilityService } from '../utility/utility.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    API_AUTHENTICATION = API_CONFIG;

    constructor(
        private router: Router,
        private utilityService: UtilityService,
        private httpOperationService: HttpOperationService,
    ) { }

    onLogin(Username: string, Password: string): void {
        this.httpOperationService.defaultPostRequest(
            this.API_AUTHENTICATION.POST_AUTH_TENANT,
            {
                user_name: Username,
                password: Password,
                app_tipe: 'w'
            }
        ).subscribe((result: AuthenticationResponseModel) => {
            if (result) {
                const userData: IAuthenticationResponseModel = {
                    full_name: result.data?.full_name,
                    id_karyawan: result.data.id_karyawan,
                    id_user: result.data.id_user,
                    id_role: result.data.id_role,
                    isAuth: result.data.isAuth,
                    menuJson: result.data.menuJson,
                    nama_role: result.data.nama_role,
                    timeOut: result.data.timeOut,
                    token: result.data.token,
                    user_name: result.data.user_name,
                };

                this.handlingAuth(userData);

                this.utilityService.onShowingCustomAlert('success', 'Success', 'Sign In Berhasil')
                    .then(() => {
                        // const mode = localStorage.getItem('ChoosenMode');

                        // if (mode == "Pendaftaran") {
                        //     this.router.navigateByUrl('beranda-loket-pendaftaran');
                        // } else {
                        //     this.router.navigateByUrl('beranda-loket-poliklinik');
                        // }

                        this.router.navigateByUrl('authentication')
                    });
            }else{
                this.utilityService.onShowingCustomAlert('error', '', 'Sign In Berhasil')
            }
        });
    }

    onLogout(): void {
        this.httpOperationService.defaultPutRequestWithoutParams(this.API_AUTHENTICATION.PUT_LOG_OUT)
            .subscribe((result) => {
                if (result) {
                    this.utilityService.onShowingCustomAlert('success', 'Success', 'Sign Out Successfully')
                        .then(() => {
                            localStorage.clear();

                            this.router.navigateByUrl('');
                        });
                }
            });
    }

    private handlingAuth(UserData: IAuthenticationResponseModel): void {
        localStorage.setItem('UserDataAntrianCIS', JSON.stringify(UserData));
    }
}
