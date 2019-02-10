import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalformulariocalidadPage } from './modalformulariocalidad.page';

describe('ModalformulariocalidadPage', () => {
  let component: ModalformulariocalidadPage;
  let fixture: ComponentFixture<ModalformulariocalidadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalformulariocalidadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalformulariocalidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
