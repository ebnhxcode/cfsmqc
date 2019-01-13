import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormularioCondicionPage } from './modal-formulario-condicion.page';

describe('ModalFormularioCondicionPage', () => {
  let component: ModalFormularioCondicionPage;
  let fixture: ComponentFixture<ModalFormularioCondicionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFormularioCondicionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormularioCondicionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
