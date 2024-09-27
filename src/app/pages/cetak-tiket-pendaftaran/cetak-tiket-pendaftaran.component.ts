import { Component, OnInit, HostListener, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { Router, UrlSerializer } from '@angular/router';
import { ModalPilihPoliAndDokterComponent } from 'src/app/components/modal/modal-pilih-poli-and-dokter/modal-pilih-poli-and-dokter.component';
import { ModalResultCheckPasienComponent } from 'src/app/components/modal/modal-result-check-pasien/modal-result-check-pasien.component';
import { IJenisPelayananModel } from 'src/app/models/antrian-pendaftaran.model';
import { CetakTiketPendaftaranService } from 'src/app/services/cetak-tiket-pendaftaran/cetak-tiket-pendaftaran.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { DisplayCetakTiketPendaftaranComponent } from '../display-cetak-tiket-pendaftaran/display-cetak-tiket-pendaftaran.component';
import * as html2pdf from 'html2pdf.js';

@Component({
    selector: 'app-cetak-tiket-pendaftaran',
    templateUrl: './cetak-tiket-pendaftaran.component.html',
    styleUrls: ['./cetak-tiket-pendaftaran.component.css']
})
export class CetakTiketPendaftaranComponent implements OnInit {

    JenisAntrianDatasource: IJenisPelayananModel[] = [];

    screenWidth: number = 0;

    screenOrientation: string = "";

    screenClass: string = "col-lg-4 col-md-4 col-sm-4 col-xs-4";

    JenisAntrian: IJenisPelayananModel;

    showContent: boolean = false;

    NomorAntrian: string = "---";

    NoRujukan: string = "";

    ResultNoRujukan = false;

    NoRujukanForSave = "";

    Kodebooking = "";

    Type = 'NIK';

    @ViewChild('ModalPilihPoliAndDokterComps') ModalPilihPoliAndDokterComps: ModalPilihPoliAndDokterComponent;

    SelectedDataPoliAndDokter: any;

    IsPasienLamaBpjs = false;

    @ViewChild('ModalResultCheckPasienComps') ModalResultCheckPasienComps: ModalResultCheckPasienComponent;

    @ViewChild('pdfContent', { static: true }) pdfContent: ElementRef;

    NoAntrianForPrint: string = "";
    SisaAntrianForPrint: number = 0;

    constructor(
        private router: Router,
        private renderer: Renderer2,
        private urlSerializer: UrlSerializer,
        private utilityService: UtilityService,
        private cetakTiketPendaftaranService: CetakTiketPendaftaranService
    ) { }

    @HostListener("window:resize", ['$event'])
    private onResize(event: any) {
        this.onDetectScreenSize(event.srcElement.innerWidth, event.srcElement.screen.orientation);
    }

    ngOnInit(): void {
        this.onDetectScreenSize(window.innerWidth, window.screen.orientation);

        this.onGetAllJenisPelayanan();
    }

    onDetectScreenSize(screenWidth: any, orientation?: any): void {
        this.screenWidth = screenWidth;
        this.screenOrientation = orientation.type;

        this.screenClass = this.screenOrientation.includes('portrait') ? 'col-lg-8 col-md-8 col-sm-8 col-xs-8' : 'col-lg-4 col-md-4 col-sm-4 col-xs-4';
    }

    onGetAllJenisPelayanan(): void {
        this.cetakTiketPendaftaranService
            .onGetAllJenisPelayanan()
            .subscribe((result) => {
                this.JenisAntrianDatasource = [];
                this.JenisAntrianDatasource.push({
                    id_jenis_loket_pelayanan: 3,
                    jenis_loket_pelayanan: "CHECK IN"
                });
                this.JenisAntrianDatasource.push(...result.data);
            });
    }

    typeNumpad(value: string): void {
        this.NoRujukan += value;
    }

    deleteChar(): void {
        if (this.NoRujukan.length > 0) {
            this.NoRujukan = this.NoRujukan.slice(0, -1);
        }
    }

    handleCheckNoRujukan(no_rujukan: string, type: string): void {
        if (type == 'NO_RUJUKAN') {
            this.cetakTiketPendaftaranService
                .onCheckNoRujuan(no_rujukan)
                .subscribe((result) => {
                    if (result.metaData.code == '200') {
                        this.ResultNoRujukan = true;
                        this.utilityService.onShowingCustomAlert('success', 'Success', 'Nomor Rujukan Ditemukan');
                    } else {
                        this.ResultNoRujukan = false;
                        this.utilityService.onShowingCustomAlert('error', 'Oops', 'Nomor Rujukan Tidak Ditemukan');
                    }
                })
        }

        if (type == 'NIK') {
            this.cetakTiketPendaftaranService
                .onCheckPasienFromHis('nik', no_rujukan)
                .subscribe((result) => {
                    if (this.IsPasienLamaBpjs) {
                        if (result.responseResult) {
                            this.ModalResultCheckPasienComps.handleOpenModal(result.data);
                        } else {
                            this.ResultNoRujukan = false;
                            this.utilityService.onShowingCustomAlert('error', 'Oops', 'NIK Tidak Ditemukan');
                        }
                    } else {
                        if (!result.responseResult && result.message == 'Pasien belum terdaftar') {
                            this.onCetakNoAntrian(this.NomorAntrian, this.JenisAntrian);
                        }
                    }
                })
        }

        if (type == 'NO_RM') {
            this.cetakTiketPendaftaranService
                .onCheckPasienFromHis('no_rm', no_rujukan)
                .subscribe((result) => {
                    if (result.responseResult) {
                        this.NoRujukanForSave = result.data.no_identitas;
                        this.ModalResultCheckPasienComps.handleOpenModal(result.data);
                    } else {
                        this.ResultNoRujukan = false;
                        this.utilityService.onShowingCustomAlert('error', 'Oops', 'N. Rekam Medis Tidak Ditemukan');
                    }
                })
        }

        if (type == 'NO_KARTU') {
            this.cetakTiketPendaftaranService
                .onCheckPasienFromHis('no_kartu', no_rujukan)
                .subscribe((result) => {
                    console.log(result);

                    if (result.responseResult) {
                        this.ModalResultCheckPasienComps.handleOpenModal(result.data);
                    } else {
                        this.ResultNoRujukan = false;
                        this.utilityService.onShowingCustomAlert('error', 'Oops', 'Nomor Kartu Tidak Ditemukan');
                    }
                })
        }

        if (type == 'NO_RENCANA_KONTROL') {
            this.cetakTiketPendaftaranService
                .onCheckNoRencanaKontrol(no_rujukan)
                .subscribe((result) => {
                    if (result.responseResult) {
                        this.ResultNoRujukan = true;
                        this.NoRujukanForSave = result.data.noSuratKontrol;
                        this.utilityService.onShowingCustomAlert('success', 'Success', 'Nomor Rencana Kontrol Ditemukan');
                    } else {
                        this.ResultNoRujukan = false;
                        this.utilityService.onShowingCustomAlert('error', 'Oops', 'Nomor Rencana Kontrol Tidak Ditemukan');
                    }
                })
        }
    }

    handleClickLanjutkanResultPasien(args: any): void {
        setTimeout(() => {
            this.ModalPilihPoliAndDokterComps.onOpeningModal();
        }, 250);
    }

    handleCheckKodeBooking(kode_booking: string): void {
        this.cetakTiketPendaftaranService.onCheckKodeBooking(kode_booking)
            .subscribe((result) => {
                const now = new Date();

                // Pad single digit hours, minutes, and seconds with leading zeros
                const hours = now.getHours().toString().padStart(2, '0');
                const minutes = now.getMinutes().toString().padStart(2, '0');
                const seconds = now.getSeconds().toString().padStart(2, '0');

                // Combine them into an integer
                const timeAsInteger: number = parseInt(hours + minutes + seconds, 10);
                this.checkGetCheckin(kode_booking,timeAsInteger)
                if (result.responseResult) {
                    this.utilityService.onShowingCustomAlert('success', 'Success', 'Kode Booking Ditemukan')
                        .then(() => {
                            this.updateWaktuTaskId(kode_booking, result.data[0]);
                          
                        })
                } else {
                    this.ResultNoRujukan = false;
                    this.utilityService.onShowingCustomAlert('error', 'Oops', 'Kode Booking Tidak Ditemukan');
                }
            })
    }

    private checkGetCheckin(kodebooking: any, waktu: number): void {
        let params = {
            kodebooking: kodebooking,
            waktu: waktu
        }
        this.cetakTiketPendaftaranService.getCheckIn(params).subscribe(result=>{
            console.log('Result get check in',result)
        })
    }

    private updateWaktuTaskId(kodebooking: string, data: any) {
        this.cetakTiketPendaftaranService.updateWaktuTaskId(kodebooking)
            .subscribe((result) => {
                if (result.responseResult) {
                    const is_bpjs = data.nomorreferensi.length ? true : false;

                    let payload: any;

                    if (is_bpjs) {
                        payload = {
                            no_antrian: this.NomorAntrian,
                            id_jenis_loket_pelayanan: 2,
                            no_rujukan: data.nik,
                            ref_tipe: "nik",
                        }
                    } else {
                        payload = {
                            no_antrian: this.NomorAntrian,
                            id_jenis_loket_pelayanan: 1,
                            no_rujukan: data.nik,
                            ref_tipe: "nik",
                        }
                    }

                    this.cetakTiketPendaftaranService.onCetakNoAntrian(payload)
                        .subscribe((result) => {
                            this.utilityService.onShowingCustomAlert('success', 'Success', `No. Antrian Anda ${result.data}`)
                                .then(() => {
                                    this.showContent = false;
                                    this.router.navigateByUrl(`display-cetak-tiket-pendaftaran/${result.data}/${this.NomorAntrian}`);
                                });
                        });
                }
            })
    }

    handleChooseJenisPasienForBpjs(IsPasienLamaBpjs: boolean) {
        const btnCloseModalJenisPasien = document.getElementById("btnCloseModalJenisPasien") as HTMLElement;
        btnCloseModalJenisPasien.click();

        if (IsPasienLamaBpjs) {
            setTimeout(() => {
                this.IsPasienLamaBpjs = IsPasienLamaBpjs;
                this.ResultNoRujukan = false;
                this.SelectedDataPoliAndDokter = { id_dokter: 0, id_poli: 0, id_jadwal_dokter: 0 };
                this.NoRujukan = "";

                this.cetakTiketPendaftaranService
                    .onGetJumlahAntrian(this.JenisAntrian.id_jenis_loket_pelayanan)
                    .subscribe((result) => {
                        this.NomorAntrian = result.data;

                        setTimeout(() => {
                            this.showContent = true;
                        }, 250);
                    });
            }, 250);
        } else {
            setTimeout(() => {
                this.ModalPilihPoliAndDokterComps.onOpeningModal();
            }, 250);
        }
    }

    onChooseJenisAntrian(pelayanan: IJenisPelayananModel): void {
        this.JenisAntrian = pelayanan;

        if (pelayanan.jenis_loket_pelayanan == 'UMUM (POLI)') {
            this.ModalPilihPoliAndDokterComps.onOpeningModal();
        }

        if (pelayanan.jenis_loket_pelayanan == 'BPJS') {
            const btnModalPilihJenisPasien = document.getElementById('btnModalPilihJenisPasien') as HTMLElement;
            btnModalPilihJenisPasien.click();
        }

        if (pelayanan.jenis_loket_pelayanan == 'CHECK IN' || pelayanan.jenis_loket_pelayanan == 'ORDER PENUNJANG' || pelayanan.jenis_loket_pelayanan == 'IGD') {
            this.showContent = true;
            this.NomorAntrian = "---";
            this.SelectedDataPoliAndDokter = { id_dokter: 0, id_poli: 0, id_jadwal_dokter: 0 };
        }
    }

    handleChoosePoliAndDokter(args: any): void {
        console.log(args);

        if (args.id_poli && args.id_dokter) {
            this.SelectedDataPoliAndDokter = args;

            if (this.JenisAntrian.jenis_loket_pelayanan == 'BPJS (POLI)' && !this.IsPasienLamaBpjs) {
                this.cetakTiketPendaftaranService
                    .onGetJumlahAntrian(this.JenisAntrian.id_jenis_loket_pelayanan)
                    .subscribe((result) => {
                        this.NomorAntrian = result.data;

                        setTimeout(() => {
                            this.showContent = true;
                        }, 250);
                    });
            } else {
                this.cetakTiketPendaftaranService
                    .onGetJumlahAntrian(this.JenisAntrian.id_jenis_loket_pelayanan)
                    .subscribe((result) => {
                        this.NomorAntrian = result.data;

                        setTimeout(() => {
                            if (this.JenisAntrian.id_jenis_loket_pelayanan == 2) {
                                this.ResultNoRujukan = true;
                            } else {
                                this.showContent = true;
                            }
                        }, 250);
                    });
            }


        }
    }

    handleClickUbahDokterAndPoli(is_bpjs?: boolean) {
        if (!is_bpjs) {
            this.showContent = false;
            setTimeout(() => {
                this.ModalPilihPoliAndDokterComps.onOpeningModal();
            }, 100);
        } else {
            // this.ModalPilihPoliAndDokterComps.SelectedPoli = { id_poli: 11, nama_poli: 'Poli Gigi' };
            this.ModalPilihPoliAndDokterComps.onOpeningModal('poliklinik');
        }
    }

    onCetakNoAntrian(no_antrian: string, jenis_pelayanan: IJenisPelayananModel): void {
        let ref_tipe = "nik";

        switch (this.Type) {
            case 'NO_RUJUKAN':
                ref_tipe = 'no_rujukan';
                break;
            case 'NIK':
                ref_tipe = 'nik';
                break;
            case 'NO_RM':
                ref_tipe = 'no_rm';
                break;
            case 'NO_KARTU':
                ref_tipe = 'no_kartu_bpjs';
                break;
            case 'NO_RENCANA_KONTROL':
                ref_tipe = 'no_surat_kontrol';
                break;
        };

        const payload = {
            id_jenis_loket_pelayanan: jenis_pelayanan.id_jenis_loket_pelayanan,
            no_rujukan: this.Type == 'NO_RM' && this.IsPasienLamaBpjs ? this.NoRujukanForSave : this.NoRujukan,
            ref_tipe: !this.IsPasienLamaBpjs ? "nik" : ref_tipe,
            id_dokter: this.SelectedDataPoliAndDokter ? this.SelectedDataPoliAndDokter.id_dokter : null,
            id_poli: this.SelectedDataPoliAndDokter ? this.SelectedDataPoliAndDokter.id_poli : null,
            id_jadwal_dokter: this.SelectedDataPoliAndDokter ? this.SelectedDataPoliAndDokter.id_jadwal_dokter : null,
        };

        this.NoAntrianForPrint = "";
        this.SisaAntrianForPrint = 0;

        this.cetakTiketPendaftaranService
            .onCetakNoAntrian(payload)
            .subscribe((result) => {
                this.utilityService.onShowingCustomAlert('success', 'Success', `No. Antrian Anda ${result.data}`)
                    .then(() => {
                        this.showContent = false;
                        this.NoRujukanForSave = "";

                        this.NoAntrianForPrint = result.data;
                        this.SisaAntrianForPrint = no_antrian as any;

                        this.IsPasienLamaBpjs = false;
                        this.SelectedDataPoliAndDokter = { id_dokter: 0, id_poli: 0, id_jadwal_dokter: 0 };

                        this.utilityService.printNewTabPdf('displayCetakTiket', 'Tiket_Pendaftaran', [72, 100], 'portrait');
                    });
            });
    }
}
