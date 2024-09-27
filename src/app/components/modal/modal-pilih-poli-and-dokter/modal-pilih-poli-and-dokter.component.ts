import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IPoliklinikModel } from 'src/app/models/antrian-poliklinik.model';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { CetakTiketPendaftaranService } from 'src/app/services/cetak-tiket-pendaftaran/cetak-tiket-pendaftaran.service';

@Component({
    selector: 'app-modal-pilih-poli-and-dokter',
    templateUrl: './modal-pilih-poli-and-dokter.component.html',
    styleUrls: ['./modal-pilih-poli-and-dokter.component.css']
})
export class ModalPilihPoliAndDokterComponent {

    State: 'poliklinik' | 'dokter' = 'poliklinik';

    PoliklinikDatasource: IPoliklinikModel[] = [];

    SelectedPoli: any;

    DokterDatasource: any[] = [];

    SelectedDokter: any;

    @Output('onSavePoliAndDokter') onSavePoliAndDokter = new EventEmitter<any>();

    constructor(
        private router: Router,
        private utilityService: UtilityService,
        private cetakTiketPendaftaranService: CetakTiketPendaftaranService
    ) { }

    ngOnInit(): void {
    }

    onOpeningModal(state?: 'dokter' | 'poliklinik'): void {
        this.State = state ? state : 'poliklinik';

        if (this.State == 'poliklinik') {
            this.cetakTiketPendaftaranService
                .onGetAllPoli()
                .subscribe((result) => {
                    this.PoliklinikDatasource = result.data;
                    const btnModalPilihPoli = document.getElementById('btnModalPilihPoli') as HTMLElement;
                    btnModalPilihPoli.click();
                });
        } else {
            this.onSavedPoli(this.SelectedPoli);
            const btnModalPilihPoli = document.getElementById('btnModalPilihPoli') as HTMLElement;
            btnModalPilihPoli.click();
        }
    }

    onCloseModal(): void {
        const btnCloseModalPilihPoli = document.getElementById('btnCloseModalPilihPoli') as HTMLElement;
        btnCloseModalPilihPoli.click();
    }

    onSavedPoli(Poliklinik: IPoliklinikModel): void {
        this.SelectedPoli = Poliklinik;

        this.cetakTiketPendaftaranService
            .onGetAllDokter(Poliklinik.id_poli)
            .subscribe((result) => {
                if (result.data.length) {
                    this.State = 'dokter';
                    this.DokterDatasource = result.data;
                } else {
                    this.utilityService.onShowingCustomAlert('error', 'Oops', 'Belum Ada Jadwal Dokter')
                }
            });
    }

    onSavedDokter(data: any): void {
        this.SelectedDokter = data;
        this.onSavePoliAndDokter.emit({
            ...this.SelectedPoli,
            ...this.SelectedDokter
        });
        this.onCloseModal();
        this.State = 'poliklinik';
    }
}
