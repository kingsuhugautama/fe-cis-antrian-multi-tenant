import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResultCheckPasienComponent } from './modal-result-check-pasien.component';

describe('ModalResultCheckPasienComponent', () => {
  let component: ModalResultCheckPasienComponent;
  let fixture: ComponentFixture<ModalResultCheckPasienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalResultCheckPasienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalResultCheckPasienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
