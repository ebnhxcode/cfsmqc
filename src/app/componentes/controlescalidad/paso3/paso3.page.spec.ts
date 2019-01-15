import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Paso3Page } from './paso3.page';

describe('Paso3Page', () => {
  let component: Paso3Page;
  let fixture: ComponentFixture<Paso3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Paso3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Paso3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
