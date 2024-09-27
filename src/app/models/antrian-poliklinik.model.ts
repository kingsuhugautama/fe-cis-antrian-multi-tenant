import { HttpResponseModel } from "./http-operation.model"

export interface IPoliklinikModel {
    id_poli: number
    id_jenis_ruangan: number
    jenis_ruangan: string
    id_outlet: number
    jenis_rawat: string
    kode_poli: string
    nama_poli: string
    is_active: boolean
    id_poli_parent: number
    id_jenis_ruangan_parent: number
    jenis_ruangan_parent: string
    id_outlet_parent: number
    jenis_rawat_parent: string
    kode_poli_parent: string
    nama_poli_parent: string
    is_active_parent: boolean
    id_setting_user_loket_poliklinik?: number
}

export class GetAllPoliklinikModel implements HttpResponseModel {
    responseResult: boolean;
    message: string;
    data: IPoliklinikModel[];
}