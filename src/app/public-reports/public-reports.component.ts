import {AfterContentInit, Component, ViewChild} from '@angular/core';
import {IPublicReport} from '../contracts';
import {BackendService} from '../backend.service';
import {BusyMonitorComponent} from '../busy-monitor/busy-monitor.component';

@Component({
  selector: 'regor-public-reports',
  templateUrl: './public-reports.component.html',
  styleUrls: ['./public-reports.component.css']
})
export class PublicReportsComponent implements AfterContentInit {
  publicReports: IPublicReport[] = [];

  @ViewChild('busyMonitor')
  busyMonitor: BusyMonitorComponent;
  constructor(private backendService: BackendService) {
  }
  ngAfterContentInit() {
    this.backendService.getPublicReports()
      .subscribeWithMonitor(this.busyMonitor, publicReports => {
        this.publicReports = publicReports;
      });
  }

}
