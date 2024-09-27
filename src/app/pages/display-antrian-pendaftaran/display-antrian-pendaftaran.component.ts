import { Socket } from 'ngx-socket-io';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FrameCardComponent } from 'src/app/components/card/frame-card/frame-card.component';
import { IAntrianPendaftaranModel } from 'src/app/models/antrian-pendaftaran.model';
import { DisplayAntrianPendaftaranService } from 'src/app/services/display-antrian-pendaftaran/display-antrian-pendaftaran.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
    selector: 'app-display-antrian-pendaftaran',
    templateUrl: './display-antrian-pendaftaran.component.html',
    styleUrls: ['./display-antrian-pendaftaran.component.css']
})
export class DisplayAntrianPendaftaranComponent implements OnInit, OnDestroy {

    Voice: SpeechSynthesisVoice[] = [];

    MainCardDatasource: IAntrianPendaftaranModel;

    OtherLoketDatasource: IAntrianPendaftaranModel[] = [];

    @ViewChild('FrameCard') FrameCard: FrameCardComponent;

    constructor(
        private socket: Socket,
        private utilityService: UtilityService,
        private displayAntrianPendaftaranService: DisplayAntrianPendaftaranService
    ) {
        this.MainCardDatasource = {
            "id_setting_user_loket_pelayanan": 0,
            "id_status_antrian": 0,
            "no_antrian": "----",
            "id_jenis_loket_pelayanan": 0,
            "jenis_loket_pelayanan": "----",
            "nama_loket_pelayanan": "----"
        };
    }

    ngOnInit(): void {
        this.onGetAllAntrianPendaftaran();

        this.onRefreshNewNoAntrian();

        this.Voice = speechSynthesis.getVoices();
    }

    onGetAllAntrianPendaftaran(): void {
        this.displayAntrianPendaftaranService.onGetAllData()
            .subscribe((result) => {
                this.OtherLoketDatasource = result.data;
            })
    }

    onRefreshNewNoAntrian(): void {
        this.socket.fromEvent('getNewAntrianPendaftaran')
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

        this.socket.fromEvent('getAntrianPendaftaran')
            .subscribe((result) => {
                if (result == "GET_ANTRIAN_PENDAFTARAN") {
                    this.onGetAllAntrianPendaftaran();
                }
            });
    }

    onGetQueueCall(): void {
        this.displayAntrianPendaftaranService.onGetQueueCall()
            .subscribe((result) => {
                if (result) {

                    let newResult: IAntrianPendaftaranModel = {
                        id_setting_user_loket_pelayanan: result.data.id_setting_user_loket_pelayanan,
                        id_status_antrian: 2,
                        no_antrian: result.data.no_antrian,
                        id_jenis_loket_pelayanan: 0,
                        jenis_loket_pelayanan: result.data.jenis_loket_pelayanan,
                        nama_loket_pelayanan: result.data.nama_loket_pelayanan
                    };

                    this.MainCardDatasource = newResult;

                    this.onCallAntrianLoket(result.data.no_antrian, result.data.nama_loket_pelayanan);
                    this.onDeleteQueueCall(result.data.id_queue_call_pendaftaran);
                }
            });
    }

    onDeleteQueueCall(id_queue_call_pendaftaran: number): void {
        this.displayAntrianPendaftaranService.onDeleteQueueCall(id_queue_call_pendaftaran)
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

    onCallAntrianLoket(noAntrian: string, noLoket: string): void {
        this.Voice = speechSynthesis.getVoices();

        console.log("list supported voice =>", this.Voice);

        let msg = new window.SpeechSynthesisUtterance();

        msg.volume = 1;
        msg.rate = 0.9;
        msg.pitch = 1;
        msg.lang = "id-ID";
        msg.voice = this.Voice.find((item: any) => { return item.name == 'Google Bahasa Indonesia' });

        console.log("msg =>", msg);

        let noPelayananArr = noAntrian.split("");
        let loketPelayananArr = noLoket.split(" ");

        msg.text = `Nomor..... Antrian,..... ${noPelayananArr[0]},..... ${noPelayananArr[1]},..... ${noPelayananArr[2]},..... ${noPelayananArr[3]},..... Menuju... Loket... ${loketPelayananArr[1]}`;

        this.onPauseYoutubeVideo();

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(msg);

        msg.addEventListener('end', () => {
            setTimeout(() => {
                this.onPlayYoutubeVideo();
            }, 250);
        });
    }

    onPauseYoutubeVideo(): void {
        this.FrameCard.onPauseVideo();
    }

    onPlayYoutubeVideo(): void {
        this.FrameCard.onPlayVideo();
    }

    ngOnDestroy(): void {
        this.socket.removeListener('getNewAntrianPendaftaran');
        this.socket.removeListener('getAntrianPendaftaran');
    }
}
