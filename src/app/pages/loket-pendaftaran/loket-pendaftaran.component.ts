import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators'
import { IAuthenticationResponseModel } from 'src/app/models/authentication.model';
import { IGetNoAntrianForLoketModel, IGetNoAntrianForLoketPoliModel } from 'src/app/models/loket-pendaftaran.model';
import { IGetAvailableLoketModel, IPostChooseLoketModel } from 'src/app/models/pilih-loket.model';
import { CetakTiketPendaftaranService } from 'src/app/services/cetak-tiket-pendaftaran/cetak-tiket-pendaftaran.service';
import { LoketPendaftaranService } from 'src/app/services/loket-pendaftaran/loket-pendaftaran.service';
import { PilihLoketService } from 'src/app/services/pilih-loket/pilih-loket.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

export interface ActionModel {
    id: string;
    icon: string;
    caption: string;
}

@Component({
    selector: 'app-loket-pendaftaran',
    templateUrl: './loket-pendaftaran.component.html',
    styleUrls: ['./loket-pendaftaran.component.css']
})
export class LoketPendaftaranComponent implements OnInit, AfterViewInit, OnDestroy {

    Destroy$ = new Subject();

    UserData: IAuthenticationResponseModel;

    Action: ActionModel[] = [];

    TimerRef!: HTMLElement;
    TimerRunning: boolean = false;
    TimerInterval: any;

    TotalPelayanan: number = 1;
    NoAntrianData: IGetNoAntrianForLoketModel;
    CurrentNoAntrian: string = "----";

    ChoosenLoket: IGetAvailableLoketModel;

    Voice: SpeechSynthesisVoice[] = [];

    Mode: string = "Pendaftaran";

    JenisPelayanan$ = this.cetakTiketPendaftaranService
        .onGetAllJenisPelayanan()
        .pipe(
            takeUntil(this.Destroy$),
            map((result) => {
                if (result.responseResult) {
                    return result.data;
                } else {
                    return [];
                }
            })
        );

    SelectedJenisPelayanan = 0;

    SisaAntrianBpjs = 0;
    SisaAntrianUmum = 0;
    SisaAntrianIgd = 0;
    SisaAntrianPenunjang = 0;

    AntrianTerlewati: any[] = [];

    constructor(
        private router: Router,
        private utilityService: UtilityService,
        private pilihLoketService: PilihLoketService,
        private loketPendaftaranService: LoketPendaftaranService,
        private cetakTiketPendaftaranService: CetakTiketPendaftaranService,
    ) { }

    ngOnInit(): void {
        this.Mode = localStorage.getItem('ChoosenMode');

        if (this.Mode === "Pendaftaran") {
            this.Action = [
                { id: 'next', icon: 'forward', caption: 'Next' },
                { id: 'call', icon: 'volume-up', caption: 'Call' },
                // { id: 'recall', icon: 'microphone-alt', caption: 'Recall' },
                // { id: 'transfer', icon: 'upload', caption: 'Transfer' },
                { id: 'start', icon: 'play', caption: 'Start' },
                { id: 'stop', icon: 'stop', caption: 'Stop' },
            ];
        } else {
            this.Action = [
                { id: 'next', icon: 'forward', caption: 'Next' },
                { id: 'call', icon: 'volume-up', caption: 'Call' },
                // { id: 'recall', icon: 'microphone-alt', caption: 'Recall' },
                { id: 'start', icon: 'play', caption: 'Start' },
                { id: 'stop', icon: 'stop', caption: 'Stop' },
            ];
        }

        this.Voice = speechSynthesis.getVoices();

        this.onGetSisaAntrian();
    }

    ngAfterViewInit(): void {
        this.TimerRef = document.getElementById('timerWaktuPelayanan') as HTMLElement;

        setTimeout(() => {
            this.UserData = JSON.parse(localStorage.getItem('UserDataAntrianCIS') as any);

            this.onGetTotalPelayanan(this.UserData.id_user);

            this.ChoosenLoket = JSON.parse(localStorage.getItem('ChoosenLoket') as any);

            // this.onGetNoAntrian();
        }, 1);
    }

    onGetTotalPelayanan(user_pelayanan: number): void {
        this.pilihLoketService.onGetTotalPelayananDaily(this.Mode, user_pelayanan)
            .subscribe((result) => {
                this.TotalPelayanan = result.data.total_pelayanan_daily;
            });
    }

    onGetNoAntrian(): void {
        let id_loket = this.Mode == "Pendaftaran" ? this.ChoosenLoket.id_jenis_loket_pelayanan : this.ChoosenLoket['id_poli'];

        let id_setting_user_loket = this.Mode == "Pendaftaran" ? this.ChoosenLoket.id_setting_user_loket_pelayanan : this.ChoosenLoket['id_setting_user_loket_poliklinik']

        this.loketPendaftaranService
            .onGetNoAntrian(this.Mode, id_loket, id_setting_user_loket)
            .subscribe((result) => {

                if (result.message !== "No. Antrian Habis") {
                    this.NoAntrianData = result.data;
                    this.CurrentNoAntrian = result.data.no_antrian;
                } else {
                    this.NoAntrianData = result.data;
                    this.CurrentNoAntrian = "----"
                }
            });
    }

    onSwitchActionMethod(action: ActionModel): void {
        if (this.CurrentNoAntrian == "----") {
            this.utilityService.onShowingCustomAlert('warning', 'Oops', 'No. Antrian Habis');
        } else {
            switch (action.id) {
                case 'next':
                    this.onNextPelayanan();
                    break;
                case 'start':
                    this.onStartPelayanan();
                    break;
                case 'call':
                    this.onCallPelayanan(this.CurrentNoAntrian);
                    break;
                case 'stop':
                    this.onStopPelayanan();
                    break;
            }
        }

        localStorage.setItem('StateLoket', action.id);
    }

    handleChangeJenisPelayanan(args: any): void {
        this.loketPendaftaranService
            .getListAntrianPerJenisPelayanan(this.SelectedJenisPelayanan)
            .subscribe((result) => {
                if (result.responseResult) {
                    if (result.data.length) {
                        this.NoAntrianData = result.data[0];
                        this.CurrentNoAntrian = result.data[0].no_antrian
                    } else {
                        this.NoAntrianData = result.data;
                        this.CurrentNoAntrian = "----"
                    }
                } else {
                    this.NoAntrianData = result.data;
                    this.CurrentNoAntrian = "----"
                }
            });

        this.onGetAntrianTerlewati(this.SelectedJenisPelayanan);
    }

    private onGetSisaAntrian() {
        // ** BPJS
        this.loketPendaftaranService
            .getSisaAntrianPerJenisPelayanan(2)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.SisaAntrianBpjs = result.data[0].sisa_antrian;
                }
            })

        // ** UMUM
        this.loketPendaftaranService
            .getSisaAntrianPerJenisPelayanan(1)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.SisaAntrianUmum = result.data[0].sisa_antrian;
                }
            })

        // ** IGD
        this.loketPendaftaranService
            .getSisaAntrianPerJenisPelayanan(4)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.SisaAntrianIgd = result.data[0].sisa_antrian;
                }
            })

        // ** PENUNJANG
        this.loketPendaftaranService
            .getSisaAntrianPerJenisPelayanan(3)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.SisaAntrianPenunjang = result.data[0].sisa_antrian;
                }
            })
    }

    private onGetAntrianTerlewati(id_jenis_loket_pelayanan: number): void {
        this.cetakTiketPendaftaranService
            .onGetAllAntrianTerlewati(id_jenis_loket_pelayanan)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.AntrianTerlewati = result.data;
                }
            })
    }

    onNextPelayanan(): void {
        this.onGetNoAntrian();
        this.onGetAntrianTerlewati(this.ChoosenLoket.id_jenis_loket_pelayanan);
        this.SelectedJenisPelayanan = 0;
    }

    onCallPelayanan(noPelayanan: string): void {

        let id_antrian = this.Mode == 'Pendaftaran' ? this.NoAntrianData.id_antrian_pendaftaran : this.NoAntrianData.id_antrian_poliklinik;

        let id_setting_user_loket = this.Mode == 'Pendaftaran' ? this.ChoosenLoket.id_setting_user_loket_pelayanan : this.ChoosenLoket['id_setting_user_loket_poliklinik'];

        this.loketPendaftaranService.onCallNoAntrian(this.Mode, id_antrian, id_setting_user_loket)
            .subscribe((result) => {
                console.log(result);
            });
    }

    onStartPelayanan(): void {
        let id_antrian = this.Mode == 'Pendaftaran' ? this.NoAntrianData.id_antrian_pendaftaran : this.NoAntrianData.id_antrian_poliklinik;

        let id_setting_user_loket = this.Mode == 'Pendaftaran' ? this.ChoosenLoket.id_setting_user_loket_pelayanan : this.ChoosenLoket['id_setting_user_loket_poliklinik'];

        this.onGetAntrianTerlewati(this.ChoosenLoket.id_jenis_loket_pelayanan);

        this.loketPendaftaranService.onStartNoAntrian(this.Mode, id_antrian, id_setting_user_loket)
            .subscribe((result) => {
                let counter = 0;

                this.TimerRef.innerHTML = "00:00:00";

                this.TimerRunning = !this.TimerRunning;

                if (this.TimerRunning) {
                    this.TimerInterval = setInterval(() => {
                        this.TimerRef.innerHTML = moment().hour(0).minute(0).second(counter++).format('HH:mm:ss');
                    }, 1000);
                } else {
                    clearInterval(this.TimerInterval);
                    this.TimerRef.innerHTML = "00:00:00";
                }
            });
    }

    onStopPelayanan(): void {
        let id_antrian = this.Mode == 'Pendaftaran' ? this.NoAntrianData.id_antrian_pendaftaran : this.NoAntrianData.id_antrian_poliklinik;

        this.loketPendaftaranService.onFinishNoAntrian(this.Mode, id_antrian)
            .subscribe((result) => {
                this.TimerRunning = false;
                clearInterval(this.TimerInterval);
                this.TimerRef.innerHTML = "00:00:00";
                this.onGetTotalPelayanan(this.UserData.id_user);
                this.onGetSisaAntrian();

                this.SelectedJenisPelayanan = 0;
                this.NoAntrianData = null;
                this.CurrentNoAntrian = "----"
            });
    }

    handleClickAntrianTerlewati(args: any): void {
        console.log(args);
        this.NoAntrianData = args;
        this.CurrentNoAntrian = args.no_antrian;
    }

    onBackToBeranda(): void {
        const StateLoket = localStorage.getItem('StateLoket');

        if (StateLoket == "start") {
            this.utilityService.onShowingCustomAlert('warning', 'Oops', 'Anda Sedang Melakukan Pelayanan');
        } else {

            let id_loket = this.Mode == 'Pendaftaran' ? this.ChoosenLoket.id_loket_pelayanan : this.ChoosenLoket['id_poli'];

            this.loketPendaftaranService.onUpdateStatusLoketToIdle(this.Mode, id_loket)
                .subscribe((result) => {
                    if (result.responseResult) {
                        if (this.Mode == "Pendaftaran") {
                            this.router.navigateByUrl('/beranda-loket-pendaftaran');
                        } else {
                            this.router.navigateByUrl('/beranda-loket-poliklinik');
                        }
                    }
                });
        }
    }

    ngOnDestroy(): void {
        clearInterval(this.TimerInterval);
        localStorage.removeItem('StateLoket');

        this.Destroy$.next(0);
        this.Destroy$.complete();
    }
}
