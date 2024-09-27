import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningTextComponent } from './running-text.component';

describe('RunningTextComponent', () => {
  let component: RunningTextComponent;
  let fixture: ComponentFixture<RunningTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunningTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RunningTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
