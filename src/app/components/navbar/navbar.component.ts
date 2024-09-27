import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UtilityService } from 'src/app/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    LogoImageClass: string = "mx-auto";

    @Input('ShowTime') ShowTime: boolean = false;

    TimeClass: string = ""

    DateText: string = "";

    Interval$: any;

    constructor(
        private router: Router,
        private location: Location,
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

    onLogout():void{
        this.utilityService.onShowLoadingBeforeSend()
        setTimeout(()=>{
            Swal.close()
            this.utilityService.onShowingCustomAlert('success','Berhasil','Log Out Sukses')
            .then(()=>{
                localStorage.clear()
                this.router.navigateByUrl('')
            })
           
        },1500)
    
    }
}
