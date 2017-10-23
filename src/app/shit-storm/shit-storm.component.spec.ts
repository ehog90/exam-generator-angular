/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShitStormComponent } from './shit-storm.component';

describe('ShitStormComponent', () => {
  let component: ShitStormComponent;
  let fixture: ComponentFixture<ShitStormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShitStormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShitStormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
