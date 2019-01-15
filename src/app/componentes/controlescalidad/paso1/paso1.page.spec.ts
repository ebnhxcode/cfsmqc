import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Paso1Page } from './paso1.page';

describe('Paso1Page', () => {
  let component: Paso1Page;
  let fixture: ComponentFixture<Paso1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Paso1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Paso1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
