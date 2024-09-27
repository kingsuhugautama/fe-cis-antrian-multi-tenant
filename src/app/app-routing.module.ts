import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helper/auth.guard';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { BerandaComponent } from './pages/beranda/beranda.component';
import { CetakTiketPendaftaranComponent } from './pages/cetak-tiket-pendaftaran/cetak-tiket-pendaftaran.component';
import { DisplayAntrianPendaftaranComponent } from './pages/display-antrian-pendaftaran/display-antrian-pendaftaran.component';
import { DisplayAntrianPoliklinikComponent } from './pages/display-antrian-poliklinik/display-antrian-poliklinik.component';
import { LoketPendaftaranComponent } from './pages/loket-pendaftaran/loket-pendaftaran.component';
import { PilihLoketComponent } from './pages/pilih-loket/pilih-loket.component';
import { DisplayCetakTiketPendaftaranComponent } from './pages/display-cetak-tiket-pendaftaran/display-cetak-tiket-pendaftaran.component';

const routes: Routes = [
    { path: '', component:AuthenticationComponent  },
    { path: 'authentication', component: BerandaComponent ,canActivate:[AuthGuard]},
    { path: 'cetak-tiket-pendaftaran', component: CetakTiketPendaftaranComponent ,canActivate:[AuthGuard]},
    { path: 'display-cetak-tiket-pendaftaran/:no_antrian/:sisa_antrian', component: DisplayCetakTiketPendaftaranComponent,canActivate:[AuthGuard] },
    { path: 'antrian-pendaftaran', component: DisplayAntrianPendaftaranComponent,canActivate:[AuthGuard] },
    { path: 'loket-pendaftaran', component: LoketPendaftaranComponent, canActivate: [AuthGuard] },
    { path: 'beranda-loket-pendaftaran', component: PilihLoketComponent, canActivate: [AuthGuard] },
    { path: 'antrian-poliklinik', component: DisplayAntrianPoliklinikComponent,canActivate:[AuthGuard] },
    { path: 'antrian-poliklinik/:id/:data', component: DisplayAntrianPoliklinikComponent,canActivate:[AuthGuard] },
    { path: 'loket-poliklinik', component: LoketPendaftaranComponent, canActivate: [AuthGuard] },
    { path: 'beranda-loket-poliklinik', component: PilihLoketComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
