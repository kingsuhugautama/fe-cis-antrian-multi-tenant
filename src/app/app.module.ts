import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { HeadingComponent } from './components/heading/heading.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LayoutDisplayComponent } from './components/layout-display/layout-display.component';
import { LayoutLoketComponent } from './components/layout-loket/layout-loket.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainCardComponent } from './components/card/main-card/main-card.component';
import { SecondaryCardComponent } from './components/card/secondary-card/secondary-card.component';
import { FrameCardComponent } from './components/card/frame-card/frame-card.component';
import { ButtonCardComponent } from './components/card/button-card/button-card.component';
import { ListCardComponent } from './components/card/list-card/list-card.component';
import { RunningTextComponent } from './components/running-text/running-text.component';

import { CetakTiketPendaftaranComponent } from './pages/cetak-tiket-pendaftaran/cetak-tiket-pendaftaran.component';
import { DisplayAntrianPendaftaranComponent } from './pages/display-antrian-pendaftaran/display-antrian-pendaftaran.component';
import { DisplayAntrianPoliklinikComponent } from './pages/display-antrian-poliklinik/display-antrian-poliklinik.component';
import { LoketPendaftaranComponent } from './pages/loket-pendaftaran/loket-pendaftaran.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { BerandaComponent } from './pages/beranda/beranda.component';
import { NavbarDisplayAntrianComponent } from './components/navbar-display-antrian/navbar-display-antrian.component';
import { PilihLoketComponent } from './pages/pilih-loket/pilih-loket.component';

import { JwtInterceptor } from './helper/jwt.interceptor';
import { ModalPilihPoliComponent } from './components/modal/modal-pilih-poli/modal-pilih-poli.component';
import { environment } from 'src/environments/environment';
import { DisplayCetakTiketPendaftaranComponent } from './pages/display-cetak-tiket-pendaftaran/display-cetak-tiket-pendaftaran.component';
import { ModalPilihPoliAndDokterComponent } from './components/modal/modal-pilih-poli-and-dokter/modal-pilih-poli-and-dokter.component';
import { ModalResultCheckPasienComponent } from './components/modal/modal-result-check-pasien/modal-result-check-pasien.component';

const config: SocketIoConfig = { url: environment.webApiAntrian, options: {} };

@NgModule({
    declarations: [
        AppComponent,
        CetakTiketPendaftaranComponent,
        DisplayAntrianPendaftaranComponent,
        LayoutComponent,
        NavbarComponent,
        HeadingComponent,
        DisplayAntrianPoliklinikComponent,
        MainCardComponent,
        SecondaryCardComponent,
        FrameCardComponent,
        LayoutDisplayComponent,
        RunningTextComponent,
        LoketPendaftaranComponent,
        AuthenticationComponent,
        BerandaComponent,
        LayoutLoketComponent,
        ButtonCardComponent,
        NavbarDisplayAntrianComponent,
        PilihLoketComponent,
        ListCardComponent,
        ModalPilihPoliComponent,
        DisplayCetakTiketPendaftaranComponent,
        ModalPilihPoliAndDokterComponent,
        ModalResultCheckPasienComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        SocketIoModule.forRoot(config),
        GridModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
