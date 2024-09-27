import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpOperationService } from '../http-operation/http-operation.service';
import * as API_CONFIG from '../../api';
import { GetAllJenisPelayananModel, GetNoAntrianModel, ICetakTiketPendaftaranModel } from 'src/app/models/antrian-pendaftaran.model';
import { HttpResponseModel } from 'src/app/models/http-operation.model';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CetakTiketPendaftaranService {

    API = API_CONFIG;

    constructor(
        private httpOperationService: HttpOperationService
    ) { }

    onCheckNoRujuan(no_rujukan: string): Observable<any> {
        return this.httpOperationService.defaultGetRequestBpjs(`${environment.webApiAdmisi}Bpjs/RujukanGet/${no_rujukan}`)
    }

    onCheckNik(nik: string): Observable<any> {
        return this.httpOperationService.defaultPostRequest(`${environment.webApiAdmisi}Bpjs/PencarianDataPesertaBPJSByNIK?nik=${nik}`, {})
    }

    onCheckNoKartu(no_kartu: string): Observable<any> {
        return this.httpOperationService.defaultPostRequest(`${environment.webApiAdmisi}Bpjs/PencarianDataPesertaBPJS`, {
            no_kartu: no_kartu,
            tgl_pelayanan: formatDate(new Date(), 'yyyy-MM-dd', 'EN')
        })
    }

    onCheckNoRencanaKontrol(no_rencana_kontrol: string): Observable<any> {
        return this.httpOperationService.defaultGetRequestBpjs(`${environment.webApiAdmisi}BPJSRencanaKontrol/GetDetailDataNoSuratKontrol/${no_rencana_kontrol}`)
    }

    onCheckKodeBooking(kode_boooking: string): Observable<any> {
        return this.httpOperationService.defaultGetRequestBpjs(`${environment.webApiAdmisi}AnrolBpjs/antran_per_kodebooking/${kode_boooking}`)
    }

    onCheckPasienFromHis(tipe: 'nik' | 'no_rm' | 'no_kartu', nomor: any): Observable<any> {
        return this.httpOperationService.defaultPostRequest(`${environment.webApiAdmisi}Antrian/CekPasienTerdaftar`, {
            tipe: tipe,
            nomor: nomor
        })
    }

    updateWaktuTaskId(kode_booking: string): Observable<any> {
        return this.httpOperationService.defaultPostRequest(`${environment.webApiAdmisi}AnrolBpjs/update_waktu_antrean`, {
            "kodebooking": kode_booking,
            "taskid": 3,
            "waktu": new Date().getTime(),
            "jenisresep": null
        });
    }

    onGetAllJenisPelayanan(): Observable<GetAllJenisPelayananModel> {
        return this.httpOperationService.defaultGetRequest(this.API.GET_ALL_JENIS_PELAYANAN);
    }

    onGetLastNoAntrian(id_jenis_loket_pelayanan: number): Observable<GetNoAntrianModel> {
        return this.httpOperationService.defaultPostRequest(this.API.GET_NO_ANTRIAN, { id_jenis_loket_pelayanan: id_jenis_loket_pelayanan });
    }

    onGetJumlahAntrian(id_jenis_loket_pelayanan: number): Observable<HttpResponseModel> {
        return this.httpOperationService.defaultGetRequest(`${this.API.GET_JUMLAH_ANTRIAN_FOR_CETAK_TIKET}${id_jenis_loket_pelayanan}`);
    }

    onCetakNoAntrian(parameter: any): Observable<HttpResponseModel> {
        return this.httpOperationService.defaultPostRequest(this.API.POST_CETAK_NO_ANTRIAN, parameter);
    }

    onGetAllPoli() {
        return this.httpOperationService.defaultGetRequest(`${environment.webApiAdmisi}Antrian/GetAllPoli`);
    }

    onGetAllDokter(id_poli: number) {
        return this.httpOperationService.defaultGetRequest(`${environment.webApiAdmisi}Antrian/GetJadwalDokterByIdPoli/${id_poli}`);
    }

    onGetAllAntrianTerlewati(id_jenis_loket_pelayanan: number) {
        return this.httpOperationService.defaultGetRequest(this.API.GET_ANTRIAN_TERLEWATI + id_jenis_loket_pelayanan);
    }

    getCheckIn(data:any):Observable<any>{
        return this.httpOperationService.defaultPostRequest(`${environment.webApiAdmisi}AnrolBpjs/getcheckin`,data)
        .pipe(catchError((error:HttpErrorResponse):any=>{
            
        }))
    }
}
