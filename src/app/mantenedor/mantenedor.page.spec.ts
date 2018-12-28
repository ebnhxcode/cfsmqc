import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { MantenedorPage } from './mantenedor.page';

describe('MantenedorPage', () => {
  let component: MantenedorPage;
  let fixture: ComponentFixture<MantenedorPage>;
  let mantenendorPage: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenedorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = await TestBed.createComponent(MantenedorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a mantenendor of 10 elements', () => {
    mantenendorPage = fixture.nativeElement;
    const items = mantenendorPage.querySelectorAll('ion-item');
    expect(items.length).toEqual(10);
  });

});
