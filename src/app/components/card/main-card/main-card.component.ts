import { Component, Input, OnInit } from '@angular/core';
import { IAntrianPendaftaranModel } from 'src/app/models/antrian-pendaftaran.model';
import { IAntrianPoliklinikModel } from 'src/app/models/loket-pendaftaran.model';

interface MainCardModel {
    type: "Pendaftaran" | "Poliklinik";
}

@Component({
    selector: 'app-main-card',
    templateUrl: './main-card.component.html',
    styleUrls: ['./main-card.component.css']
})
export class MainCardComponent implements OnInit {

    @Input('Datasource') Datasource: any;

    @Input('Model') Model: "Pendaftaran" | "Poliklinik";

    constructor() {
        this.Datasource = {
            "id_setting_user_loket_pelayanan": 0,
            "id_status_antrian": 0,
            "no_antrian": "----",
            "id_jenis_loket_pelayanan": 0,
            "jenis_loket_pelayanan": "----",
            "nama_loket_pelayanan": "----"
        };

        this.Model = "Pendaftaran";
    }

    ngOnInit(): void {
    }

}
