import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutLoketComponent } from './layout-loket.component';

describe('LayoutLoketComponent', () => {
  let component: LayoutLoketComponent;
  let fixture: ComponentFixture<LayoutLoketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutLoketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutLoketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
