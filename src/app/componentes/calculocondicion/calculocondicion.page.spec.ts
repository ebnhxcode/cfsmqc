import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculocondicionPage } from './calculocondicion.page';

describe('CalculocondicionPage', () => {
  let component: CalculocondicionPage;
  let fixture: ComponentFixture<CalculocondicionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculocondicionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculocondicionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
