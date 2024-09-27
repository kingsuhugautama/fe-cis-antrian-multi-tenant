import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CetakTiketPendaftaranComponent } from './cetak-tiket-pendaftaran.component';

describe('CetakTiketPendaftaranComponent', () => {
  let component: CetakTiketPendaftaranComponent;
  let fixture: ComponentFixture<CetakTiketPendaftaranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CetakTiketPendaftaranComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CetakTiketPendaftaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
