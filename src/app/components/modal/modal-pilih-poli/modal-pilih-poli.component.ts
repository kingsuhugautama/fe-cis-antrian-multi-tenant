import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IPoliklinikModel } from 'src/app/models/antrian-poliklinik.model';
import { DisplayAntrianPoliklinikService } from 'src/app/services/display-antrian-poliklinik/display-antrian-poliklinik.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import Config from './json/poliklinik.json';

@Component({
    selector: 'app-modal-pilih-poli',
    templateUrl: './modal-pilih-poli.component.html',
    styleUrls: ['./modal-pilih-poli.component.css']
})
export class ModalPilihPoliComponent implements OnInit {

    DataConfig: any = Config;

    PoliklinikDatasource: IPoliklinikModel[];

    @Output('onSavePoli') onSavePoli = new EventEmitter<any>();

    constructor(
        private router: Router,
        private utilityService: UtilityService,
        private displayAntrianPoliklinikService: DisplayAntrianPoliklinikService
    ) { }

    ngOnInit(): void {
    }

    onOpeningModal(): void {
        this.displayAntrianPoliklinikService.onGetAllPoliklinik()
            .subscribe((result) => {
                this.PoliklinikDatasource = result.data;

                const btnModalPilihPoli = document.getElementById('btnModalPilihPoli') as HTMLElement;
                btnModalPilihPoli.click();
            });
    }

    onCloseModal(): void {
        const btnCloseModalPilihPoli = document.getElementById('btnCloseModalPilihPoli') as HTMLElement;
        btnCloseModalPilihPoli.click();
    }

    onSavedPoli(Poliklinik: IPoliklinikModel): void {
        this.onCloseModal();

        setTimeout(() => {
            this.router.navigate(['antrian-poliklinik/', Poliklinik.id_poli, Poliklinik.nama_poli]);
        }, 200);
    }
}
