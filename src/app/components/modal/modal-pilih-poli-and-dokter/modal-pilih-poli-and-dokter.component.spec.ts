import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPilihPoliAndDokterComponent } from './modal-pilih-poli-and-dokter.component';

describe('ModalPilihPoliAndDokterComponent', () => {
  let component: ModalPilihPoliAndDokterComponent;
  let fixture: ComponentFixture<ModalPilihPoliAndDokterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPilihPoliAndDokterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPilihPoliAndDokterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
