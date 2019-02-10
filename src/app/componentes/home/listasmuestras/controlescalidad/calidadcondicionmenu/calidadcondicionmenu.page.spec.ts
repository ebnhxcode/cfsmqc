
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadcondicionmenuPage } from './calidadcondicionmenu.page';

describe('CalidadcondicionmenuPage', () => {
  let component: CalidadcondicionmenuPage;
  let fixture: ComponentFixture<CalidadcondicionmenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalidadcondicionmenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalidadcondicionmenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
