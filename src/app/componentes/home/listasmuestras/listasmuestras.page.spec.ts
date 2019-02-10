import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasmuestrasPage } from './listasmuestras.page';

describe('ListasmuestrasPage', () => {
  let component: ListasmuestrasPage;
  let fixture: ComponentFixture<ListasmuestrasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListasmuestrasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListasmuestrasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
