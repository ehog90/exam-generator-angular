import {AfterContentInit, Component, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {IShit} from '../contracts';
import 'rxjs/add/observable/timer';
import {BackendService} from '../backend.service';
import {BusyMonitorComponent} from '../busy-monitor/busy-monitor.component';

@Component({
  selector: 'regor-shit-storm',
  templateUrl: './shit-storm.component.html',
  styleUrls: ['./shit-storm.component.css']
})
export class ShitStormComponent implements AfterContentInit {

  constructor(private backendService: BackendService) {
  }

  shitStormData: IShit[];
  currentShit: IShit;
  shitIndex = 0;
  timer: Observable<any>;
  timerSubscription: Subscription;

  @ViewChild('busyMonitor')
  busyMonitor: BusyMonitorComponent;

  nextShit(): void {
    ++this.shitIndex;
    this.currentShit = this.shitStormData[this.shitIndex];
    if (this.shitIndex >= this.shitStormData.length) {
      this.getShits();
    }

  }

  setUpTimer() {
    this.timer = Observable.timer(0, 1000);
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timerSubscription = this.timer.subscribe(() => {
      this.nextShit();
    });
  }

  cancelTimer(): void {
    this.timer = null;
    this.timerSubscription.unsubscribe();
  }

  getShits() {
    this.backendService.getShitStorm()
      .subscribeWithMonitor(this.busyMonitor, shitStormData => {
        this.shitStormData = shitStormData;
        this.shitIndex = 0;
        this.currentShit = this.shitStormData[this.shitIndex];
      });
  }

  ngAfterContentInit() {
    this.getShits();
  }


}
