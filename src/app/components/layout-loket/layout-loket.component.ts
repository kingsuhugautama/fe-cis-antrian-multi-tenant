import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAuthenticationResponseModel } from 'src/app/models/authentication.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LoketPendaftaranService } from 'src/app/services/loket-pendaftaran/loket-pendaftaran.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
    selector: 'app-layout-loket',
    templateUrl: './layout-loket.component.html',
    styleUrls: ['./layout-loket.component.css']
})
export class LayoutLoketComponent implements OnInit, AfterViewInit {

    UserName: string = "";

     LogoImageClass: string = "mx-auto";

    constructor(
        public utilityService: UtilityService,
        private authenticationService: AuthenticationService,
        private loketPendaftaranService: LoketPendaftaranService,
        private router:Router
    ) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            const UserData: IAuthenticationResponseModel = JSON.parse(localStorage.getItem('UserDataAntrianCIS') as any);
            this.UserName = UserData.full_name;
        }, 1);
    }


    onClickButtonLogout(): void {
        const choosenLoket = JSON.parse(localStorage.getItem('ChoosenLoket') as any);
        if (choosenLoket) {
            let mode = localStorage.getItem('ChoosenMode') ? localStorage.getItem('ChoosenMode') : null;

            let id_loket = mode == 'Pendaftaran' ? choosenLoket.id_loket_pelayanan : choosenLoket['id_poli'];

            this.loketPendaftaranService.onUpdateStatusLoketToIdle(mode, id_loket)
                .subscribe((result) => {
                    if (result.responseResult) {
                        this.authenticationService.onLogout();
                    }
                });
        } else {
            this.authenticationService.onLogout();
        }

    }

    onGoBack():void{
        this.router.navigateByUrl('authentication')
    }
}
