import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarDisplayAntrianComponent } from './navbar-display-antrian.component';

describe('NavbarDisplayAntrianComponent', () => {
  let component: NavbarDisplayAntrianComponent;
  let fixture: ComponentFixture<NavbarDisplayAntrianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarDisplayAntrianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarDisplayAntrianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
