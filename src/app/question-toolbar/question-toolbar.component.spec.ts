import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionToolbarComponent } from './question-toolbar.component';

describe('QuestionToolbarComponent', () => {
  let component: QuestionToolbarComponent;
  let fixture: ComponentFixture<QuestionToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
