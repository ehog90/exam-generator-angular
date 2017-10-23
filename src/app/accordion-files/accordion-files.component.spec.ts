/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegorAccordionFilesComponent } from './accordion-files.component';

describe('RegorAccordionFilesComponent', () => {
  let component: RegorAccordionFilesComponent;
  let fixture: ComponentFixture<RegorAccordionFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegorAccordionFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegorAccordionFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
