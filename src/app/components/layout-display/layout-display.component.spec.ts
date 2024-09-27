import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDisplayComponent } from './layout-display.component';

describe('LayoutDisplayComponent', () => {
  let component: LayoutDisplayComponent;
  let fixture: ComponentFixture<LayoutDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
