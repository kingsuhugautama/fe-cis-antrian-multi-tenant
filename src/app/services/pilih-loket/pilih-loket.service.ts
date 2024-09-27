import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAvailableLoketModel, GetMinutesPelayananModel, GetTotalPelayananDailyModel, GetTotalPelayananModel, IGetAvailableLoketModel, IPostChooseLoketModel, IPostChooseLoketPoliklinikModel } from 'src/app/models/pilih-loket.model';
import { HttpOperationService } from '../http-operation/http-operation.service';
import * as API from '../../api';
import { HttpResponseModel } from 'src/app/models/http-operation.model';
import { DisplayAntrianPendaftaranService } from '../display-antrian-pendaftaran/display-antrian-pendaftaran.service';
import { GetAllPoliklinikModel } from 'src/app/models/antrian-poliklinik.model';
import { DisplayAntrianPoliklinikService } from '../display-antrian-poliklinik/display-antrian-poliklinik.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class PilihLoketService {

    API_INDEX = API;

    constructor(
        private httpOperationService: HttpOperationService,
        private displayAntrianPoliklinikService: DisplayAntrianPoliklinikService
    ) { }

    onGetTotalPelayananDaily(mode: string, user_pelayanan: number): Observable<GetTotalPelayananDailyModel> {
        if (mode == "Pendaftaran") {
            return this.httpOperationService.defaultGetRequest(`${this.API_INDEX.GET_TOTAL_PELAYANAN_DAILY}${user_pelayanan}`);
        } else {
            return this.httpOperationService.defaultGetRequest(`${this.API_INDEX.GET_TOTAL_PELAYANAN_DAILY_POLI}${user_pelayanan}`);
        }
    }

    onGetTotalPelayanan(mode: string, user_pelayanan: number): Observable<GetTotalPelayananModel> {
        if (mode == "Pendaftaran") {
            return this.httpOperationService.defaultGetRequest(`${this.API_INDEX.GET_TOTAL_PELAYANAN}${user_pelayanan}`);
        } else {
            return this.httpOperationService.defaultGetRequest(`${this.API_INDEX.GET_TOTAL_PELAYANAN_POLI}${user_pelayanan}`);
        }
    }

    onGetMinutesPelayanan(mode: string, user_pelayanan: number): Observable<GetMinutesPelayananModel> {
        if (mode == "Pendaftaran") {
            return this.httpOperationService.defaultGetRequest(`${this.API_INDEX.GET_MINUTES_PELAYANAN}${user_pelayanan}`);
        } else {
            return this.httpOperationService.defaultGetRequest(`${this.API_INDEX.GET_MINUTES_PELAYANAN_POLI}${user_pelayanan}`);
        }
    }

    onGetAvailableLoket(mode: string): Observable<HttpResponseModel> {
        if (mode == "Pendaftaran") {
            return this.onGetAvailableLoketPendaftaran();
        } else {
            return this.onGetAvailablePoliklinik();
        }
    }

    onGetAvailableLoketPendaftaran(): Observable<GetAvailableLoketModel> {
        // return this.httpOperationService.defaultGetRequest(this.API_INDEX.GET_AVAILABLE_LOKET);
        return this.httpOperationService.defaultGetRequest(`${environment.webApiPis}AntrianPendaftaran/ListLoketPelayanan`);
    }

    onGetAvailablePoliklinik(): Observable<GetAllPoliklinikModel> {
        return this.displayAntrianPoliklinikService.onGetAllPoliklinik();
    }

    onChooseLoketPendaftaran(parameter: IPostChooseLoketModel): Observable<HttpResponseModel> {
        return this.httpOperationService.defaultPostRequest(this.API_INDEX.POST_CHOOSE_LOKET, parameter)
        
    }

    onChooseLoketPoliklinik(parameter: IPostChooseLoketPoliklinikModel): Observable<HttpResponseModel> {
        return this.httpOperationService.defaultPostRequest(this.API_INDEX.POST_CHOOSE_LOKET_POLI, parameter);
    }
}
