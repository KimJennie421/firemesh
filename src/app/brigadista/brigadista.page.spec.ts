import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrigadistaPage } from './brigadista.page';

describe('BrigadistaPage', () => {
  let component: BrigadistaPage;
  let fixture: ComponentFixture<BrigadistaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrigadistaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrigadistaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
