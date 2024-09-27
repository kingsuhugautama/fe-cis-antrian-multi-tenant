import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPilihPoliComponent } from './modal-pilih-poli.component';

describe('ModalPilihPoliComponent', () => {
  let component: ModalPilihPoliComponent;
  let fixture: ComponentFixture<ModalPilihPoliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPilihPoliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPilihPoliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
