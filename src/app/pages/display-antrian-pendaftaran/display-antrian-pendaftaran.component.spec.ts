import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAntrianPendaftaranComponent } from './display-antrian-pendaftaran.component';

describe('DisplayAntrianPendaftaranComponent', () => {
  let component: DisplayAntrianPendaftaranComponent;
  let fixture: ComponentFixture<DisplayAntrianPendaftaranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAntrianPendaftaranComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAntrianPendaftaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
