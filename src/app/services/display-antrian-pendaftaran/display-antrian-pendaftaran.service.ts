import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllAntrianPendaftaranModel, GetQueueCallPendaftaranModel } from 'src/app/models/antrian-pendaftaran.model';
import { HttpOperationService } from '../http-operation/http-operation.service';
import * as API_CONFIG from '../../api';
import { HttpResponseModel } from 'src/app/models/http-operation.model';

@Injectable({
    providedIn: 'root'
})
export class DisplayAntrianPendaftaranService {

    API_CONFIG = API_CONFIG;

    constructor(
        private httpOperationService: HttpOperationService
    ) { }

    onGetQueueCall(): Observable<GetQueueCallPendaftaranModel> {
        return this.httpOperationService.defaultGetRequest(this.API_CONFIG.GET_QUEUE_CALL_PENDAFTARAN_FOR_DISPLAY);
    }

    onDeleteQueueCall(id_queue_call_pendaftaran: number): Observable<HttpResponseModel> {
        return this.httpOperationService.defaultDeleteRequest(this.API_CONFIG.DELETE_QUEUE_CALL_PENDAFTARAN_FOR_DISPLAY, id_queue_call_pendaftaran);
    }

    onGetAllData(): Observable<GetAllAntrianPendaftaranModel> {
        return this.httpOperationService.defaultGetRequest(this.API_CONFIG.GET_ALL_ANTRIAN_PENDAFTARAN_FOR_DISPLAY);
    }
}
