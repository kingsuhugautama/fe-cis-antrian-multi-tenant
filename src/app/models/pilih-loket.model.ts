import { HttpResponseModel } from "./http-operation.model";

export class GetTotalPelayananDailyModel implements HttpResponseModel {
    responseResult: boolean;
    message: string;
    data: {
        total_pelayanan_daily: number
    };
}

export class GetTotalPelayananModel implements HttpResponseModel {
    responseResult: boolean;
    message: string;
    data: {
        total_pelayanan: number
    };
}

export class GetMinutesPelayananModel implements HttpResponseModel {
    responseResult: boolean;
    message: string;
    data: {
        minutes_pelayanan: number
    };
}

export interface IGetAvailableLoketModel {
    id_setting_user_loket_pelayanan: number;
    id_loket_pelayanan: number;
    nama_loket_pelayanan: string;
    id_jenis_loket_pelayanan: number;
    jenis_loket_pelayanan: string;
}

export class GetAvailableLoketModel implements HttpResponseModel {
    responseResult: boolean;
    message: string;
    data: IGetAvailableLoketModel[];
}

export interface IPostChooseLoketModel {
    id_loket_pelayanan: number;
    user_pelayanan: number;
}

export interface IPostChooseLoketPoliklinikModel {
    id_poli: number;
    user_pelayanan: number;
}