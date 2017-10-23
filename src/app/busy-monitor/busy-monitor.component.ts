import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'regor-busy-monitor',
  templateUrl: './busy-monitor.component.html',
  styleUrls: ['./busy-monitor.component.scss']
})
export class BusyMonitorComponent implements OnInit {
  isBusy = false;
  errorMessage: any;
  isInError = false;

  constructor() {
  }

  ngOnInit() {
  }
  private reset(): void {
    this.errorMessage = null;
    this.isInError = true;
  }

  public assign<T>(observable: Observable<T>, onNext?: (value: T) => void, onError?: (error) => void, onCompleted?: () => void) {
    this.isBusy = true;
    observable.subscribe(value => {
      if (onNext) {
        onNext(value);
      }
    }, (error) => {
      this.isBusy = false;
      this.errorMessage = error.toString();
      if (onError) {
        onError(error);
      }
    }, () => {
      this.isBusy = false;
      if (onCompleted) {
        onCompleted();
      }
    });
  }

}
