import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalformulariocalidadcondicionPage } from './modalformulariocalidadcondicion.page';

describe('ModalformulariocalidadcondicionPage', () => {
  let component: ModalformulariocalidadcondicionPage;
  let fixture: ComponentFixture<ModalformulariocalidadcondicionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalformulariocalidadcondicionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalformulariocalidadcondicionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
