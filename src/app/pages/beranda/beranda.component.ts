import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalPilihPoliComponent } from 'src/app/components/modal/modal-pilih-poli/modal-pilih-poli.component';

export interface MenuModel {
    id: number;
    caption: string;
    url: string;
}

@Component({
    selector: 'app-beranda',
    templateUrl: './beranda.component.html',
    styleUrls: ['./beranda.component.css']
})
export class BerandaComponent implements OnInit {

    Menu: MenuModel[] = [];

    screenWidth: number = 0;

    screenOrientation: string = "";

    screenClass: string = "col-lg-4 col-md-4 col-sm-4 col-xs-4";

    public clinicnya:any

    @ViewChild('ModalPilihPoli') ModalPilihPoli!: ModalPilihPoliComponent;

    constructor(
        private router: Router
    ) { }

    @HostListener("window:resize", ['$event'])
    private onResize(event: any) {
        this.onDetectScreenSize(event.srcElement.innerWidth, event.srcElement.screen.orientation);
    }

    ngOnInit(): void {
        const DataStorage = JSON.parse(localStorage.getItem('UserDataAntrianCIS'))
        console.log('DataStorage',DataStorage)
        this.clinicnya = DataStorage.full_name
        this.Menu = [
            { id: 1, caption: 'Cetak Tiket Pendaftaran', url: 'cetak-tiket-pendaftaran' },
            { id: 2, caption: 'Display Antrian Pendaftaran', url: 'antrian-pendaftaran' },
            { id: 3, caption: 'Loket Pendaftaran', url: 'beranda-loket-pendaftaran' },
            { id: 4, caption: 'Display Antrian Poliklinik', url: 'antrian-poliklinik' },
            { id: 5, caption: 'Loket Poliklinik', url: 'beranda-loket-pendaftaran' },
        ];

        this.onDetectScreenSize(window.innerWidth, window.screen.orientation);
    }

    onDetectScreenSize(screenWidth: any, orientation?: any): void {
        this.screenWidth = screenWidth;
        this.screenOrientation = orientation.type;

        this.screenClass = this.screenOrientation.includes('portrait') ? 'col-lg-8 col-md-8 col-sm-8 col-xs-8' : 'col-lg-6 col-md-6 col-sm-6 col-xs-6 mb-5';
    }

    onChooseMenu(item: MenuModel): void {
        switch (item.id) {
            case 1:
                this.router.navigate([`${item.url}`]);
                break;
            case 2:
                this.router.navigate([`${item.url}`]);
                break;
            case 3:
                localStorage.setItem('ChoosenMode', "Pendaftaran");
                this.router.navigate([`${item.url}`]);
                break;
            case 4:
                this.onOpenModalPilihPoli();
                break;
            case 5:
                localStorage.setItem('ChoosenMode', "Poliklinik");
                this.router.navigate([`${item.url}`]);
                break;
            default:
                break;
        }
    }

    onOpenModalPilihPoli(): void {
        this.ModalPilihPoli.onOpeningModal();
    }
}
