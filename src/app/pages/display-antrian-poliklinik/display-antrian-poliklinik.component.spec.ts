import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAntrianPoliklinikComponent } from './display-antrian-poliklinik.component';

describe('DisplayAntrianPoliklinikComponent', () => {
  let component: DisplayAntrianPoliklinikComponent;
  let fixture: ComponentFixture<DisplayAntrianPoliklinikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAntrianPoliklinikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAntrianPoliklinikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
