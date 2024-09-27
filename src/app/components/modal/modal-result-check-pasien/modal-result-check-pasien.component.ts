import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-modal-result-check-pasien',
    templateUrl: './modal-result-check-pasien.component.html',
    styleUrls: ['./modal-result-check-pasien.component.css']
})
export class ModalResultCheckPasienComponent {

    DataPasien: any;

    @Output('onClickLanjutkan') onClickLanjutkan = new EventEmitter<any>();

    handleOpenModal(data: any): void {
        this.DataPasien = data;

        setTimeout(() => {
            const btnModalResultCheckPasien = document.getElementById('btnModalResultCheckPasien') as HTMLElement;
            btnModalResultCheckPasien.click();
        }, 100);
    }

    convertDate(date: any) {
        if (date) {
            return formatDate(new Date(date), 'dd-MM-yyyy', 'EN')
        } else {
            return "-"
        }
    }

    handleClickLanjutkan(): void {
        this.onClickLanjutkan.emit(this.DataPasien);
        const btnCloseModalResultCheckPasien = document.getElementById('btnCloseModalResultCheckPasien') as HTMLElement;
        btnCloseModalResultCheckPasien.click();
    }
}
