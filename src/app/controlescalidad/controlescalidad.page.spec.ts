import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlescalidadPage } from './controlescalidad.page';

describe('ControlescalidadPage', () => {
  let component: ControlescalidadPage;
  let fixture: ComponentFixture<ControlescalidadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlescalidadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlescalidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
