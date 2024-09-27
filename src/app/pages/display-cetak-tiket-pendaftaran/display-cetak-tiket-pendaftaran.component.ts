import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-display-cetak-tiket-pendaftaran',
    templateUrl: './display-cetak-tiket-pendaftaran.component.html',
    styleUrls: ['./display-cetak-tiket-pendaftaran.component.css']
})
export class DisplayCetakTiketPendaftaranComponent implements AfterViewInit, OnDestroy {

    Destroy$ = new Subject();

    Date = new Date();

    @Input('NoAntrian') NoAntrian: any = "";
    @Input('SisaAntrian') SisaAntrian: any = "";

    constructor(
        private activatedRoute: ActivatedRoute
    ) { }

    ngAfterViewInit(): void {
        // setTimeout(() => {
        //     this.activatedRoute
        //         .params
        //         .pipe(takeUntil(this.Destroy$))
        //         .subscribe((result) => {
        //             this.NoAntrian = result.no_antrian;
        //             this.SisaAntrian = result.sisa_antrian;

        //             if (this.NoAntrian && this.SisaAntrian) {
        //                 window.print();
        //             }
        //         })
        // }, 100);
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }
}
