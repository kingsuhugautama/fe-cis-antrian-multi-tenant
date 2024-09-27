import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllPoliklinikModel } from 'src/app/models/antrian-poliklinik.model';
import { HttpOperationService } from '../http-operation/http-operation.service';
import * as API from '../../api';
import { GetAllAntrianPoliklinikModel, GetQueueCallPoliklinikModel } from 'src/app/models/loket-pendaftaran.model';
import { HttpResponseModel } from 'src/app/models/http-operation.model';

@Injectable({
    providedIn: 'root'
})
export class DisplayAntrianPoliklinikService {

    API_CONFIG = API;

    constructor(
        private httpOperationService: HttpOperationService
    ) { }

    onGetAllPoliklinik(): Observable<GetAllPoliklinikModel> {
        return this.httpOperationService.defaultGetRequest(this.API_CONFIG.GET_ALL_POLIKLINIK);
    }

    onGetQueueCall(): Observable<GetQueueCallPoliklinikModel> {
        return this.httpOperationService.defaultGetRequest(this.API_CONFIG.GET_QUEUE_CALL_POLIKLINIK_FOR_DISPLAY);
    }

    onDeleteQueueCall(id_queue_call_poliklinik: number): Observable<HttpResponseModel> {
        return this.httpOperationService.defaultDeleteRequest(this.API_CONFIG.DELETE_QUEUE_CALL_POLIKLINIK_FOR_DISPLAY, id_queue_call_poliklinik);
    }

    onGetAllData(id_poli: number): Observable<GetAllAntrianPoliklinikModel> {
        return this.httpOperationService.defaultGetRequest(`${this.API_CONFIG.GET_ALL_ANTRIAN_POLIKLINIK_FOR_DISPLAY}${id_poli}`);
    }
}
