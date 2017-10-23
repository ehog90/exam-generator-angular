import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegorAnnouncementComponent } from './announcement.component';

describe('RegorAnnouncementComponent', () => {
  let component: RegorAnnouncementComponent;
  let fixture: ComponentFixture<RegorAnnouncementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegorAnnouncementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegorAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
