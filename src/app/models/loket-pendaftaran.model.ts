import { HttpResponseModel } from "./http-operation.model";

export interface IGetNoAntrianForLoketModel {
    id_antrian_pendaftaran: number
    no_antrian: string
    jenis_loket_pelayanan: string
    time_created: string
    id_antrian_poliklinik?: number
    nama_pasien?: string
}

export interface IGetNoAntrianForLoketPoliModel {
    id_antrian_poliklinik: number
    no_antrian: string
    nama_pasien: string
    time_created: string
}

export class GetNoAntrianForLoketModel implements HttpResponseModel {
    responseResult: boolean;
    message: string;
    data: IGetNoAntrianForLoketModel;
}

export interface IQueueCallPoliklinikModel {
    id_queue_call_poliklinik: number;
    id_antrian_poliklinik: number;
    id_setting_user_loket_poliklinik: number;
    no_antrian: string;
    nama_pasien: string;
    nama_poli: string;
}

export class GetQueueCallPoliklinikModel implements HttpResponseModel {
    responseResult: boolean;
    message: string;
    data: IQueueCallPoliklinikModel;
}

export interface IAntrianPoliklinikModel {
    id_setting_user_loket_poliklinik: number
    id_status_antrian: number
    no_antrian: string
    id_jenis_loket_pelayanan: number
    kode_poli: string
    nama_poli: string
    nama_pasien: string
    tgl_admisi: Date;
}

export class GetAllAntrianPoliklinikModel implements HttpResponseModel {
    responseResult: boolean;
    message: string;
    data: IAntrianPoliklinikModel[];
}