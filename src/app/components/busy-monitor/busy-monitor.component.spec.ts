import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusyMonitorComponent } from './busy-monitor.component';

describe('BusyMonitorComponent', () => {
  let component: BusyMonitorComponent;
  let fixture: ComponentFixture<BusyMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusyMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusyMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
