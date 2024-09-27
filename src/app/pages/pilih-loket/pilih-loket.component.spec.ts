import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilihLoketComponent } from './pilih-loket.component';

describe('PilihLoketComponent', () => {
  let component: PilihLoketComponent;
  let fixture: ComponentFixture<PilihLoketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PilihLoketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PilihLoketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
