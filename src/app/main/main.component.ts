import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
import {ISubjectMetaSmall} from '../contracts';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import {BusyMonitorComponent} from '../busy-monitor/busy-monitor.component';
import {BackendService} from '../backend.service';

@Component({
  selector: 'regor-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements AfterContentInit, OnInit {
  availableSubjects: ISubjectMetaSmall[];
  searchObservable = new Subject<string>();

  @ViewChild('busyMonitor')
  busyMonitor: BusyMonitorComponent;

  constructor(private backendService: BackendService,
              private router: Router) {
  }
  ngAfterContentInit(): void {
    this.backendService.getSubjectList()
      .subscribeWithMonitor(this.busyMonitor, subjectList => {
        this.availableSubjects = subjectList;
      });
  }
  ngOnInit() {
    this.searchObservable
      .debounceTime(600)
      .filter(searchString => !!searchString)
      .subscribe(searchString => {
        this.router.navigate(['free-search/', searchString]);
      });
  }

}
