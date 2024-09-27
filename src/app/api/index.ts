import { environment } from "src/environments/environment";

export const POST_AUTHENTICATION = `${environment.webApiPis}` + 'Authentication/Login';
export const POST_AUTH_TENANT = `${environment.webApiPis}` + 'Authentication/LoginTenant';
export const PUT_LOG_OUT = `${environment.webApiPis}` + 'Authentication/SetLogoutTime';

export const GET_ALL_JENIS_PELAYANAN = `${environment.webApiAntrian}/antrian-pendaftaran/GetAllJenisPelayanan`;

// ** ANTRIAN PENDAFTARAN
export const GET_NO_ANTRIAN = `${environment.webApiAntrian}/antrian-pendaftaran/GetNoAntrian`;
export const GET_JUMLAH_ANTRIAN_FOR_CETAK_TIKET = `${environment.webApiAntrian}/antrian-pendaftaran/GetJumlahAntrianCallForWaiting/`;
export const POST_CETAK_NO_ANTRIAN = `${environment.webApiAntrian}/antrian-pendaftaran/CetakTiketPendaftaran`;

export const GET_TOTAL_PELAYANAN_DAILY = `${environment.webApiAntrian}/antrian-pendaftaran/GetTotalPelayananDaily/`;
export const GET_TOTAL_PELAYANAN = `${environment.webApiAntrian}/antrian-pendaftaran/GetTotalPelayanan/`;
export const GET_MINUTES_PELAYANAN = `${environment.webApiAntrian}/antrian-pendaftaran/GetMinutesPelayanan/`;

export const GET_AVAILABLE_LOKET = `${environment.webApiAntrian}/antrian-pendaftaran/GetAvailableLoket`;
export const POST_CHOOSE_LOKET = `${environment.webApiAntrian}/antrian-pendaftaran/ChooseLoket`;
export const POST_UPDATE_STATUS_LOKET_TO_IDLE = `${environment.webApiAntrian}/antrian-pendaftaran/UpdateStatusLoketToIdle`;
export const GET_NO_ANTRIAN_FOR_LOKET = `${environment.webApiAntrian}/antrian-pendaftaran/GetNoAntrianForLoket`;
export const POST_CALL_NO_ANTRIAN = `${environment.webApiAntrian}/antrian-pendaftaran/CallNoAntrian`;
export const POST_START_PELAYANAN_NO_ANTRIAN = `${environment.webApiAntrian}/antrian-pendaftaran/StartPelayananNoAntrian`;
export const POST_FINISH_PELAYANAN_NO_ANTRIAN = `${environment.webApiAntrian}/antrian-pendaftaran/FinishPelayananNoAntrian`;
export const GET_LIST_ANTRIAN_PER_JENIS_LOKET_PENDAFTARAN = `${environment.webApiAntrian}/antrian-pendaftaran/GetListAntrianPasien/`;
export const GET_SISA_ANTRIAN_PER_JENIS_LOKET_PENDAFTARAN = `${environment.webApiAntrian}/antrian-pendaftaran/GetSisaAntrianPasienByIdJenisPelayanan/`;
export const GET_ANTRIAN_TERLEWATI = `${environment.webApiAntrian}/antrian-pendaftaran/GetListAntrianTerlewati/`;

export const GET_QUEUE_CALL_PENDAFTARAN_FOR_DISPLAY = `${environment.webApiAntrian}/queue-call-pendaftaran/GetQueueCallPendaftaran`;
export const DELETE_QUEUE_CALL_PENDAFTARAN_FOR_DISPLAY = `${environment.webApiAntrian}/queue-call-pendaftaran/DeleteQueueCallPendaftaran/`;
export const GET_ALL_ANTRIAN_PENDAFTARAN_FOR_DISPLAY = `${environment.webApiAntrian}/antrian-pendaftaran/GetDataForDisplay`;

// ** ANTRIAN POLIKLINIK
export const GET_ALL_POLIKLINIK = `${environment.webApiBilling}tarif/Poli/GetAllRecursive`;

export const GET_TOTAL_PELAYANAN_DAILY_POLI = `${environment.webApiAntrian}/antrian-poliklinik/GetTotalPelayananDaily/`;
export const GET_TOTAL_PELAYANAN_POLI = `${environment.webApiAntrian}/antrian-poliklinik/GetTotalPelayanan/`;
export const GET_MINUTES_PELAYANAN_POLI = `${environment.webApiAntrian}/antrian-poliklinik/GetMinutesPelayanan/`;

export const POST_CHOOSE_LOKET_POLI = `${environment.webApiAntrian}/antrian-poliklinik/ChooseLoket`;
export const POST_UPDATE_STATUS_LOKET_POLI_TO_IDLE = `${environment.webApiAntrian}/antrian-poliklinik/UpdateStatusLoketToIdle`;
export const GET_NO_ANTRIAN_FOR_LOKET_POLI = `${environment.webApiAntrian}/antrian-poliklinik/GetNoAntrianForLoket`;
export const POST_CALL_NO_ANTRIAN_POLI = `${environment.webApiAntrian}/antrian-poliklinik/CallNoAntrian`;
export const POST_START_PELAYANAN_NO_ANTRIAN_POLI = `${environment.webApiAntrian}/antrian-poliklinik/StartPelayananNoAntrian`;
export const POST_FINISH_PELAYANAN_NO_ANTRIAN_POLI = `${environment.webApiAntrian}/antrian-poliklinik/FinishPelayananNoAntrian`;

export const GET_QUEUE_CALL_POLIKLINIK_FOR_DISPLAY = `${environment.webApiAntrian}/queue-call-poliklinik/GetQueueCallPoliklinik`;
export const DELETE_QUEUE_CALL_POLIKLINIK_FOR_DISPLAY = `${environment.webApiAntrian}/queue-call-poliklinik/DeleteQueueCallPoliklinik/`;
export const GET_ALL_ANTRIAN_POLIKLINIK_FOR_DISPLAY = `${environment.webApiAntrian}/antrian-poliklinik/GetDataForDisplay/`;