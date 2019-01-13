import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarqrPage } from './ingresarqr.page';

describe('IngresarqrPage', () => {
  let component: IngresarqrPage;
  let fixture: ComponentFixture<IngresarqrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresarqrPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarqrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
