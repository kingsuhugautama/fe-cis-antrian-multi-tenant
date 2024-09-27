import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
// import 'moment/locale/id';
import Swal from 'sweetalert2';
import * as html2pdf from 'html2pdf.js';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    Voice: SpeechSynthesisVoice[] = [];

    constructor(
        private router: Router,
        private location: Location
    ) { }

    onFormatDate(date: any, format?: string): string {
        moment.locale('id')

        let date_now = format ? moment(date).format(format) : moment(date).format();

        return date_now;
    }

    onShowLoadingBeforeSend(): void {
        Swal.fire({
            title: 'Loading...',
            showCancelButton: false,
            showConfirmButton: false,
            showDenyButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });
    }

    onShowingCustomAlert(icon: any, title: string, message: string, customClass?: string): Promise<any> {
        return Swal.fire({
            icon,
            title,
            text: message,
            showCloseButton: false,
            showConfirmButton: true,
            customClass: {
                popup: customClass
            }
        });
    }

    onShowingAlertPasienFound(data: any): Promise<any> {
        return Swal.fire({
            icon: 'question',
            title: 'Apakah Data Diri Anda Sudah Sesuai?',
            html: `
            <div class="row">
               
            </div>
            `,
            showCloseButton: true,
            showConfirmButton: true,
        });
    }

    onShowingMultipleMessageAlert(icon: any, title: string, message: any): Promise<any> {
        let text = "";

        message.forEach((item: any) => {
            text += `<li class="text-danger mb-1">${item}</li>`;
        });

        return Swal.fire({
            icon,
            title,
            html: `<ul>${text}</ul>`,
            showCloseButton: false,
            showConfirmButton: true,
            customClass: {
                popup: 'swal-wide',
                htmlContainer: 'text-justify'
            }
        })
    }

    onOpenFullscreen(): void {
        const elem = document.documentElement as any;
        elem.requestFullscreen();
    }

    onExitFullscreen(): void {
        const elem = document.documentElement as any;
        elem.exitFullscreen();
    }

    /**
     * @param cetakan_div_id Div id nya cetakan contoh: #displayCetakTiket
     * @param fileName file name contoh Tiket_Pendaftaran (tanpa ekstensi .pdf)
     */
    printNewTabPdf(cetakan_div_id: string, fileName: string, format_kertas: any, orientation: 'portrait' | 'landscape') {
        const el = document.getElementById(cetakan_div_id) as HTMLElement;

        const title = `${fileName}_${new Date().getTime()}.pdf`

        const opt = {
            margin: 1,
            filename: title,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: format_kertas, orientation: orientation }
        };

        html2pdf()
            .from(el)
            .set(opt)
            .output('blob') // Output the PDF as a blob
            .then((pdfBlob) => {
                const pdfUrl = URL.createObjectURL(pdfBlob); // Create a temporary URL for the blob
                window.open(pdfUrl, '_blank'); // Open the PDF in a new tab
            });
    }
}
