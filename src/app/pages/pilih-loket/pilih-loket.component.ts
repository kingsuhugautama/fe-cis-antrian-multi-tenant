import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetAllPoliklinikModel, IPoliklinikModel } from 'src/app/models/antrian-poliklinik.model';
import { IAuthenticationResponseModel } from 'src/app/models/authentication.model';
import { GetAvailableLoketModel, IGetAvailableLoketModel, IPostChooseLoketModel, IPostChooseLoketPoliklinikModel } from 'src/app/models/pilih-loket.model';
import { PilihLoketService } from 'src/app/services/pilih-loket/pilih-loket.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-pilih-loket',
    templateUrl: './pilih-loket.component.html',
    styleUrls: ['./pilih-loket.component.css']
})
export class PilihLoketComponent implements OnInit, AfterViewInit {

    UserData: IAuthenticationResponseModel;

    UserName: string = "";

    Mode: string = "Pendaftaran";

    TotalPelayananDaily: number;

    TotalPelayanan: number;

    MinutesPelayanan: number;

    AvailableLoketPendaftaran: IGetAvailableLoketModel[] = [];

    AvailableLoketPoliklinik: IPoliklinikModel[] = [];

    UrlRedirect: string;

    constructor(
        private router: Router,
        private utilityService: UtilityService,
        private pilihLoketService: PilihLoketService,
    ) { }

    ngOnInit(): void {
        this.Mode = localStorage.getItem('ChoosenMode');

        this.UrlRedirect = this.Mode == "Pendaftaran" ? "/loket-pendaftaran" : "/loket-poliklinik";

        this.onGetAvailableLoket(this.Mode);
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.UserData = JSON.parse(localStorage.getItem('UserDataAntrianCIS') as any);
            this.UserName = this.UserData.full_name;

            this.onGetTotalPelayanan(this.UserData.id_user);
            this.onGetTotalPelayananDaily(this.UserData.id_user);
            this.onGetMinutesPelayanan(this.UserData.id_user);
        }, 1);
    }

    onGetTotalPelayanan(user_pelayanan: number): void {
        this.pilihLoketService.onGetTotalPelayanan(this.Mode, user_pelayanan)
            .subscribe((result) => {
                this.TotalPelayanan = result.data.total_pelayanan;
            });
    }

    onGetTotalPelayananDaily(user_pelayanan: number): void {
        this.pilihLoketService.onGetTotalPelayananDaily(this.Mode, user_pelayanan)
            .subscribe((result) => {
                this.TotalPelayananDaily = result.data.total_pelayanan_daily;
            });
    }

    onGetMinutesPelayanan(user_pelayanan: number): void {
        this.pilihLoketService.onGetMinutesPelayanan(this.Mode, user_pelayanan)
            .subscribe((result) => {
                this.MinutesPelayanan = result.data.minutes_pelayanan;
            });
    }

    onGetAvailableLoket(mode: string): void {
        this.pilihLoketService.onGetAvailableLoket(mode)
            .subscribe((result) => {
                if (mode == "Pendaftaran") {
                    const resultPendaftaran = result as GetAvailableLoketModel;
                    this.AvailableLoketPendaftaran = resultPendaftaran.data;
                } else {
                    const resultPoliklinik = result as GetAllPoliklinikModel;
                    this.AvailableLoketPoliklinik = resultPoliklinik.data;
                }
            })
    }

    onChooseLoket(loket: IGetAvailableLoketModel): void {
        const parameter: IPostChooseLoketModel = {
            id_loket_pelayanan: loket.id_loket_pelayanan,
            // user_pelayanan: this.UserData.id_user
            user_pelayanan:2
        };

        this.pilihLoketService.onChooseLoketPendaftaran(parameter)
            .subscribe((result) => {

                loket.id_setting_user_loket_pelayanan = result.data;

                localStorage.setItem("ChoosenLoket", JSON.stringify(loket));

                this.utilityService.onShowLoadingBeforeSend();

                setTimeout(() => {
                    Swal.close();
                    this.router.navigate([`${this.UrlRedirect}`]);
                }, 2000);
            });
    }

    onChoosePoliklinik(poliklinik: IPoliklinikModel): void {
        const parameter: IPostChooseLoketPoliklinikModel = {
            id_poli: poliklinik.id_poli,
            user_pelayanan: this.UserData.id_user
        };

        this.pilihLoketService.onChooseLoketPoliklinik(parameter)
            .subscribe((result) => {

                poliklinik.id_setting_user_loket_poliklinik = result.data;

                localStorage.setItem("ChoosenLoket", JSON.stringify(poliklinik));

                this.utilityService.onShowLoadingBeforeSend();

                setTimeout(() => {
                    Swal.close();
                    this.router.navigate([`${this.UrlRedirect}`]);
                }, 2000);
            });
    }
}
