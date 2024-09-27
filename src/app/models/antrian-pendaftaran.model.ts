import { HttpResponseModel } from "./http-operation.model";

export interface IJenisPelayananModel {
    id_jenis_loket_pelayanan: number;
    jenis_loket_pelayanan: string;
}

export class GetAllJenisPelayananModel implements HttpResponseModel {
    responseResult: boolean;
    message: string;
    data: IJenisPelayananModel[];
}

export class GetNoAntrianModel implements HttpResponseModel {
    responseResult: boolean;
    message: string;
    data: string;
}

export interface ICetakTiketPendaftaranModel {
    no_antrian: string;
    id_jenis_loket_pelayanan: number;
    no_rujukan?: string;
    ref_tipe?: string;
}

export interface IQueueCallPendaftaranModel {
    id_queue_call_pendaftaran: number;
    id_antrian_pendaftaran: number;
    id_setting_user_loket_pelayanan: number;
    no_antrian: string;
    jenis_loket_pelayanan: string;
    nama_loket_pelayanan: string;
}

export class GetQueueCallPendaftaranModel implements HttpResponseModel {
    responseResult: boolean;
    message: string;
    data: IQueueCallPendaftaranModel;
}

export interface IAntrianPendaftaranModel {
    id_setting_user_loket_pelayanan: number
    id_status_antrian: number
    no_antrian: string
    id_jenis_loket_pelayanan: number
    jenis_loket_pelayanan: string
    nama_loket_pelayanan: string
}

export class GetAllAntrianPendaftaranModel implements HttpResponseModel {
    responseResult: boolean;
    message: string;
    data: IAntrianPendaftaranModel[];
}