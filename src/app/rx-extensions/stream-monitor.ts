import { Observable, OperatorFunction } from 'rxjs';

export interface IStreamMonitor {
  isActive: boolean;
  pumps: number;
  error: any;
}

export function createMonitor(): IStreamMonitor {
  return {isActive: false, error: null, pumps: 0};
}


export function monitor<T>(streamMonitor: IStreamMonitor): OperatorFunction<T, T> {
  return (source$: Observable<T>): Observable<T> => {
    return new Observable<T>(observer => {
      streamMonitor.isActive = true;
      streamMonitor.error = null;
      streamMonitor.pumps = 0;

      const wrapper = {
        next: (value: T) => {
          ++streamMonitor.pumps;
          observer.next(value);
        },
        error: (error: any) => {
          streamMonitor.isActive = false;
          streamMonitor.error = error;
          observer.error(error);
        },
        complete: () => {
          streamMonitor.isActive = false;
          observer.complete();
        }
      };
      return source$.subscribe(wrapper);
    });
  };
}
