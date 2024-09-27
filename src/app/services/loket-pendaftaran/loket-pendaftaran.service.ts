import { Injectable } from '@angular/core';
import { HttpOperationService } from '../http-operation/http-operation.service';
import * as API from '../../api';
import { Observable } from 'rxjs';
import { HttpResponseModel } from 'src/app/models/http-operation.model';
import { GetNoAntrianForLoketModel } from 'src/app/models/loket-pendaftaran.model';

@Injectable({
    providedIn: 'root'
})
export class LoketPendaftaranService {

    API_CONFIG = API;

    constructor(
        private httpOperationService: HttpOperationService
    ) { }

    onUpdateStatusLoketToIdle(mode: string, id_loket_pelayanan: number): Observable<HttpResponseModel> {
        if (mode == 'Pendaftaran') {
            return this.httpOperationService.defaultPostRequest(this.API_CONFIG.POST_UPDATE_STATUS_LOKET_TO_IDLE, {
                id_loket_pelayanan: id_loket_pelayanan
            });
        } else {
            return this.httpOperationService.defaultPostRequest(this.API_CONFIG.POST_UPDATE_STATUS_LOKET_POLI_TO_IDLE, {
                id_poli: id_loket_pelayanan
            });
        }
    }

    onGetNoAntrian(mode: string, id_loket: number, id_setting_user_loket: number): Observable<GetNoAntrianForLoketModel> {
        if (mode == 'Pendaftaran') {
            return this.httpOperationService.defaultPostRequest(this.API_CONFIG.GET_NO_ANTRIAN_FOR_LOKET, {
                id_jenis_loket_pelayanan: id_loket,
                id_setting_user_loket_pelayanan: id_setting_user_loket
            });
        } else {
            return this.httpOperationService.defaultPostRequest(this.API_CONFIG.GET_NO_ANTRIAN_FOR_LOKET_POLI, {
                id_poli: id_loket,
                id_setting_user_loket_poliklinik: id_setting_user_loket
            });
        }
    }

    onCallNoAntrian(mode: string, id_antrian: number, id_setting_user_loket: number): Observable<HttpResponseModel> {
        if (mode == 'Pendaftaran') {
            return this.httpOperationService.defaultPostRequest(this.API_CONFIG.POST_CALL_NO_ANTRIAN, {
                id_antrian_pendaftaran: id_antrian,
                id_setting_user_loket_pelayanan: id_setting_user_loket,
            });
        } else {
            return this.httpOperationService.defaultPostRequest(this.API_CONFIG.POST_CALL_NO_ANTRIAN_POLI, {
                id_antrian_poliklinik: id_antrian,
                id_setting_user_loket_poliklinik: id_setting_user_loket,
            });
        }
    }

    onStartNoAntrian(mode: string, id_antrian: number, id_setting_user_loket: number): Observable<HttpResponseModel> {
        if (mode == 'Pendaftaran') {
            return this.httpOperationService.defaultPostRequest(this.API_CONFIG.POST_START_PELAYANAN_NO_ANTRIAN, {
                id_antrian_pendaftaran: id_antrian,
                id_setting_user_loket_pelayanan: id_setting_user_loket,
            });
        } else {
            return this.httpOperationService.defaultPostRequest(this.API_CONFIG.POST_START_PELAYANAN_NO_ANTRIAN_POLI, {
                id_antrian_poliklinik: id_antrian,
                id_setting_user_loket_poliklinik: id_setting_user_loket,
            });
        }
    }

    onFinishNoAntrian(mode: string, id_antrian: number): Observable<HttpResponseModel> {
        if (mode == 'Pendaftaran') {
            return this.httpOperationService.defaultPostRequest(this.API_CONFIG.POST_FINISH_PELAYANAN_NO_ANTRIAN, {
                id_antrian_pendaftaran: id_antrian
            });
        } else {
            return this.httpOperationService.defaultPostRequest(this.API_CONFIG.POST_FINISH_PELAYANAN_NO_ANTRIAN_POLI, {
                id_antrian_poliklinik: id_antrian
            });
        }
    }

    getListAntrianPerJenisPelayanan(id_jenis_loket_pelayanan: number): Observable<HttpResponseModel> {
        return this.httpOperationService.defaultGetRequest(this.API_CONFIG.GET_LIST_ANTRIAN_PER_JENIS_LOKET_PENDAFTARAN + id_jenis_loket_pelayanan);
    }

    getSisaAntrianPerJenisPelayanan(id_jenis_loket_pelayanan: number): Observable<HttpResponseModel> {
        return this.httpOperationService.defaultGetRequest(this.API_CONFIG.GET_SISA_ANTRIAN_PER_JENIS_LOKET_PENDAFTARAN + id_jenis_loket_pelayanan);
    }
}
