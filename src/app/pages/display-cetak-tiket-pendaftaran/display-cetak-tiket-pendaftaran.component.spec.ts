import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCetakTiketPendaftaranComponent } from './display-cetak-tiket-pendaftaran.component';

describe('DisplayCetakTiketPendaftaranComponent', () => {
  let component: DisplayCetakTiketPendaftaranComponent;
  let fixture: ComponentFixture<DisplayCetakTiketPendaftaranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCetakTiketPendaftaranComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayCetakTiketPendaftaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
