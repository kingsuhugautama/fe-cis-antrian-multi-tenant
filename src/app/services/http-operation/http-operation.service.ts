import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { HttpResponseModel } from 'src/app/models/http-operation.model';
import Swal from 'sweetalert2';
import { UtilityService } from '../utility/utility.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpOperationService {

    constructor(
        private router: Router,
        private httpClient: HttpClient,
        private utilityService: UtilityService
    ) { }

    defaultPostRequest(url: string, req: any): Observable<any> {
        this.utilityService.onShowLoadingBeforeSend();

        return this.httpClient.post<any>(
            url, req,
            {
                headers: new HttpHeaders().set('Content-Type', 'application/json')
            }
        ).pipe(
            map((result) => {
                Swal.close();

                if (result.responseResult) {
                    return result;
                } else {
                    return this.handlingErrorWithStatusCode200(result);
                }
            }),
            catchError((error: HttpErrorResponse): any => {
                return this.handlingError(error, req);
            }),
        );
    }

    defaultGetRequestWithStaticBearer(url: string): Observable<any> {
        this.utilityService.onShowLoadingBeforeSend();

        return this.httpClient.get<any>(
            url,
            {
                headers: new HttpHeaders()
                    .set('Content-Type', 'application/json')
                    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjciLCJuYmYiOjE2NDY2Mzg3MDcsImV4cCI6MTY0NzI0MzUwNywiaWF0IjoxNjQ2NjM4NzA3fQ.-jPpuCzibskKPIA2OMwZAeBqvMbuGz1ZaWvseNldskA')
            }
        ).pipe(
            map((result) => {
                Swal.close();

                if (result.responseResult || result.data.length) {
                    return result;
                } else {
                    return this.handlingErrorWithStatusCode200(result);
                }
            }),
            catchError((error: HttpErrorResponse): any => {
                return this.handlingError(error);
            }),
        );
    }

    defaultGetRequest(url: string): Observable<any> {
        this.utilityService.onShowLoadingBeforeSend();

        return this.httpClient.get<any>(
            url,
            {
                headers: new HttpHeaders().set('Content-Type', 'application/json')
            }
        ).pipe(
            map((result) => {
                Swal.close();

                if (result.responseResult) {
                    return result;
                } else {
                    return this.handlingErrorWithStatusCode200(result);
                }
            }),
            catchError((error: HttpErrorResponse): any => {
                return this.handlingError(error);
            }),
        );
    }

    defaultGetRequestBpjs(url: string): Observable<any> {
        this.utilityService.onShowLoadingBeforeSend();

        return this.httpClient.get<any>(
            url,
            {
                headers: new HttpHeaders().set('Content-Type', 'application/json')
            }
        ).pipe(
            map((result) => {
                Swal.close();
                return result;
            }),
            catchError((error: HttpErrorResponse): any => {
                return this.handlingError(error);
            }),
        );
    }

    defaultPutRequestWithoutParams(url: string): Observable<any> {
        this.utilityService.onShowLoadingBeforeSend();

        return this.httpClient.put<any>(
            url, null,
            {
                headers: new HttpHeaders().set('Content-Type', 'application/json')
            }
        ).pipe(
            map((result) => {
                Swal.close();

                if (result.responseResult === false) {
                    return this.handlingErrorWithStatusCode200(result);
                } else {
                    return result;
                }
            }),
            catchError((error: HttpErrorResponse): any => {
                return this.handlingError(error);
            }),
        );
    }

    defaultDeleteRequest(url: string, params: any): Observable<any> {
        this.utilityService.onShowLoadingBeforeSend();

        return this.httpClient.delete<any>(
            `${url}${params}`,
            {
                headers: new HttpHeaders().set('Content-Type', 'application/json')
            }
        ).pipe(
            map((result) => {
                Swal.close();

                if (result.responseResult === false) {
                    return this.handlingErrorWithStatusCode200(result);
                } else {
                    return result;
                }
            }),
            catchError((error: HttpErrorResponse): any => {
                return this.handlingError(error);
            }),
        );
    }

    handlingErrorWithStatusCode200(response: HttpResponseModel): any {

        if (response.data && response.data.length > 0 && typeof response.data !== "string") {
            this.utilityService.onShowingMultipleMessageAlert('error', 'Oops...', response.data);
        };

        if (response.data && Object.keys(response.data).length > 0) {
            this.utilityService.onShowingCustomAlert('error', 'Oops...', response.message);
        };

        return response;
    }

    handlingError(error: HttpErrorResponse, parameter?: any): any {
        return throwError(error);
    }
}
