import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameCardComponent } from './frame-card.component';

describe('FrameCardComponent', () => {
  let component: FrameCardComponent;
  let fixture: ComponentFixture<FrameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
