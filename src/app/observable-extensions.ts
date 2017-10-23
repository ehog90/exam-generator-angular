import {Observable} from 'rxjs/Observable';
import {BusyMonitorComponent} from './busy-monitor/busy-monitor.component';
import 'rxjs/add/operator/map';

declare module 'rxjs/Observable' {
  interface Observable<T> {
    mapToJson<T>(): Observable<T>;
    subscribeWithMonitor<T>(busyMonitor: BusyMonitorComponent,
                            onNext: (res) => void, onError?: (error) => void, onCompleted?: () => void);
  }
}

Observable.prototype.mapToJson = function () {
  return this.map(x => x.json());
};
Observable.prototype.subscribeWithMonitor =
  function (busyMonitor: BusyMonitorComponent, onNext?: (value) => void, onError?: (error) => void, onCompleted?: () => void) {
    busyMonitor.assign(this, onNext, onError, onCompleted);
    return this;
  };
