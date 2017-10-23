import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
import {IAllFilesEntry} from '../contracts';
import {BackendService} from '../backend.service';
import {BusyMonitorComponent} from '../busy-monitor/busy-monitor.component';

@Component({
  selector: 'regor-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements AfterContentInit {

  files: IAllFilesEntry[];
  @ViewChild('busyMonitor')
  busyMonitor: BusyMonitorComponent;

  constructor(private backendService: BackendService) { }

  ngAfterContentInit() {
    this.backendService.getAllFiles()
      .subscribeWithMonitor(this.busyMonitor, files => {
        this.files = files.fileData;
      });
  }

}
