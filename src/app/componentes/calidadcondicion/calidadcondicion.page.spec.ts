import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadcondicionPage } from './calidadcondicion.page';

describe('CalidadcondicionPage', () => {
  let component: CalidadcondicionPage;
  let fixture: ComponentFixture<CalidadcondicionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalidadcondicionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalidadcondicionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
