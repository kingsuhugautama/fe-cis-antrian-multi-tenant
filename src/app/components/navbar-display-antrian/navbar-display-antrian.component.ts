import { Component, Input, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
    selector: 'app-navbar-display-antrian',
    templateUrl: './navbar-display-antrian.component.html',
    styleUrls: ['./navbar-display-antrian.component.css']
})
export class NavbarDisplayAntrianComponent implements OnInit {

    LogoImageClass: string = "mx-auto";

    @Input('ShowTime') ShowTime: boolean = false;

    TimeClass: string = ""

    DateText: string = "";

    Interval$: any;

    constructor(
        public utilityService: UtilityService
    ) { }

    ngOnInit(): void {
        if (this.ShowTime) {
            this.LogoImageClass = "me-auto ps-5";
            this.ShowTime = true;
            this.DateText = this.utilityService.onFormatDate(new Date(), 'Do MMMM yyyy');

            setTimeout(() => {
                let textTime = document.getElementById('textTime') as HTMLElement;
                textTime.innerHTML = "00:00:00";

                this.Interval$ = window.setInterval(() => {
                    textTime.innerHTML = this.utilityService.onFormatDate(new Date(), 'HH:mm:ss');
                }, 1000)
            }, 100);
        } else {
            window.clearInterval(this.Interval$);
        }
    }
}
