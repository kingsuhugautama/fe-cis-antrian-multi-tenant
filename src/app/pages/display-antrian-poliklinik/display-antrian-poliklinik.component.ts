import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { GridColumnModel } from 'src/app/components/card/list-card/list-card.component';
import { IAntrianPoliklinikModel } from 'src/app/models/loket-pendaftaran.model';
import { DisplayAntrianPoliklinikService } from 'src/app/services/display-antrian-poliklinik/display-antrian-poliklinik.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
    selector: 'app-display-antrian-poliklinik',
    templateUrl: './display-antrian-poliklinik.component.html',
    styleUrls: ['./display-antrian-poliklinik.component.css']
})
export class DisplayAntrianPoliklinikComponent implements OnInit, AfterViewInit, OnDestroy {

    Voice: SpeechSynthesisVoice[] = [];

    MainCardDatasource: IAntrianPoliklinikModel;

    GridColumnAntrianPoli: GridColumnModel[] = [];

    GridDatasourceAntrianPoli: IAntrianPoliklinikModel[] = [];

    constructor(
        private socket: Socket,
        private activatedRoute: ActivatedRoute,
        private utilityService: UtilityService,
        private displayAntrianPoliklinikService: DisplayAntrianPoliklinikService
    ) {
        this.MainCardDatasource = {
            "id_setting_user_loket_poliklinik": 0,
            "id_status_antrian": 0,
            "no_antrian": "----",
            "id_jenis_loket_pelayanan": 0,
            "kode_poli": "----",
            "nama_poli": "----",
            "nama_pasien": "----",
            "tgl_admisi": new Date,
        };
    }

    ngOnInit(): void {
        this.GridColumnAntrianPoli = [
            {
                width: 80,
                field: 'no_antrian',
                headerText: 'NO. ANTRIAN',
                visible: true,
            },
            {
                width: 150,
                field: 'nama_pasien',
                headerText: 'NAMA PASIEN',
                visible: true,
            },
            {
                width: 100,
                field: 'tgl_admisi',
                headerText: 'TGL_ADMISI',
                visible: false,
                type: 'dateTime',
                format: 'HH:mm:ss'
            },
        ];

        this.onRefreshNewNoAntrian();

        this.Voice = speechSynthesis.getVoices();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            const id_poli = this.activatedRoute.snapshot.params['id'];
            const nama_poli = this.activatedRoute.snapshot.params['data'];

            if (id_poli && nama_poli) {
                this.MainCardDatasource.nama_poli = nama_poli;

                this.onGetAllAntrianPoliklinik(id_poli);
            }
        }, 1);
    }

    onGetAllAntrianPoliklinik(id_poli: number): void {
        this.displayAntrianPoliklinikService.onGetAllData(id_poli)
            .subscribe((result) => {
                this.GridDatasourceAntrianPoli = result.data;
            });
    }

    onRefreshNewNoAntrian(): void {
        this.socket.fromEvent('getNewAntrianPoliklinik')
            .subscribe((result) => {
                const isSpeaking = window.speechSynthesis.speaking;

                if (isSpeaking) {
                    setTimeout(() => {
                        this.onGetQueueCall();
                    }, 6000);
                } else {
                    this.onGetQueueCall();
                }
            });

        this.socket.fromEvent('getAntrianPoliklinik')
            .subscribe((result) => {
                if (result == "GET_ANTRIAN_POLIKLINIK") {
                    const id_poli = this.activatedRoute.snapshot.params['id'];
                    this.onGetAllAntrianPoliklinik(id_poli);
                }
            });
    }

    onGetQueueCall(): void {
        this.displayAntrianPoliklinikService.onGetQueueCall()
            .subscribe((result) => {
                if (result) {

                    let newResult: IAntrianPoliklinikModel = {
                        id_setting_user_loket_poliklinik: result.data.id_setting_user_loket_poliklinik,
                        id_status_antrian: 2,
                        no_antrian: result.data.no_antrian,
                        id_jenis_loket_pelayanan: 0,
                        kode_poli: "",
                        nama_poli: result.data.nama_poli,
                        nama_pasien: result.data.nama_pasien,
                        tgl_admisi: new Date()
                    };

                    this.MainCardDatasource = newResult;

                    this.onCallAntrianLoket(result.data.no_antrian, result.data.nama_poli);
                    this.onDeleteQueueCall(result.data.id_queue_call_poliklinik);
                }
            });
    }

    onDeleteQueueCall(id_queue_call_poliklinik: number): void {
        this.displayAntrianPoliklinikService.onDeleteQueueCall(id_queue_call_poliklinik)
            .subscribe(
                (result) => {
                    console.log(result);
                }, (error) => {
                    console.log(error);
                }, () => {
                    // this.onGetQueueCall();
                }
            );
    }

    onCallAntrianLoket(noAntrian: string, namaPoli: string): void {
        this.Voice = speechSynthesis.getVoices();

        let msg = new window.SpeechSynthesisUtterance();
        msg.volume = 1;
        msg.rate = 0.9;
        msg.pitch = 1;
        msg.lang = "id-ID";
        msg.voice = this.Voice[11];

        let noPelayananArr = noAntrian.split("");

        msg.text = `Nomor..... Antrian,..... ${noPelayananArr[0]},..... ${noPelayananArr[1]},..... ${noPelayananArr[2]},..... ${noPelayananArr[3]},..... Menuju... Poli... ${namaPoli}`;

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(msg);
    }

    ngOnDestroy(): void {
        this.socket.removeListener('getNewAntrianPoliklinik');
        this.socket.removeListener('getAntrianPoliklinik');
    }
}
