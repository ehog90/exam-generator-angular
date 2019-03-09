import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicReportDetailsComponent } from './public-report-details.component';

describe('PublicReportDetailsComponent', () => {
  let component: PublicReportDetailsComponent;
  let fixture: ComponentFixture<PublicReportDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicReportDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicReportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
