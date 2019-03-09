/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CppQuizComponent } from './cpp-quiz.component';

describe('CppQuizComponent', () => {
  let component: CppQuizComponent;
  let fixture: ComponentFixture<CppQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CppQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CppQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
