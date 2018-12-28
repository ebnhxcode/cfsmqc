import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoayudaPage } from './autoayuda.page';

describe('AutoayudaPage', () => {
  let component: AutoayudaPage;
  let fixture: ComponentFixture<AutoayudaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoayudaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoayudaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
