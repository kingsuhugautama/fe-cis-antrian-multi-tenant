import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoketPendaftaranComponent } from './loket-pendaftaran.component';

describe('LoketPendaftaranComponent', () => {
  let component: LoketPendaftaranComponent;
  let fixture: ComponentFixture<LoketPendaftaranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoketPendaftaranComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoketPendaftaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
