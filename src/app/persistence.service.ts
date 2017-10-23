import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {isArray, find} from 'lodash';
import 'rxjs/add/operator/bufferTime';

enum ItemChangeType {Bool, String, Array, AddToArray, RemoveFromArray}

interface LocalStorageSaveQuery {
  itemType: ItemChangeType;
  namespace: string;
  key: string;
  value: any;
}


@Injectable()
export class PersistenceService {

  public localStorageAvailable = true;
  private changes = new Subject<LocalStorageSaveQuery>();

  constructor() {
    if (typeof(Storage) === 'undefined') {
      this.localStorageAvailable = false;
    }
    this.changes.bufferTime(100).subscribe(x => this.saveValues(x));
  }
  public saveValues(toSave: LocalStorageSaveQuery[]) {
    if (!this.localStorageAvailable) {
      return;
    }
    toSave.forEach(x => {
      const key = `${x.namespace}__${x.key}`;
      switch (x.itemType) {
        case ItemChangeType.Bool:
          localStorage.setItem(key, x.value ? 'true' : 'false');
          break;
        case ItemChangeType.String:
          localStorage.setItem(key, x.value);
          break;
        case ItemChangeType.AddToArray: {
          const arrayToParse: any = localStorage.getItem(key);
          if (!arrayToParse) {
            localStorage.setItem(key, JSON.stringify([x.value]));
          } else {
            try {
              const currentArray = <any[]>JSON.parse(arrayToParse);
              if (!find(currentArray, y => y === x.value)) {
                currentArray.push(x.value);
                localStorage.setItem(key, JSON.stringify(currentArray));
              }
            } catch (error) {
              localStorage.setItem(key, JSON.stringify([x.value]));
            }
          }
          break;
        }
        case ItemChangeType.RemoveFromArray: {
          const arrayToParse: any = localStorage.getItem(key);
          if (!arrayToParse) {
            break;
          } else {
            try {
              let currentArray = <any[]>JSON.parse(arrayToParse);
               currentArray = currentArray.filter(y => y !== x.value);
              localStorage.setItem(key, JSON.stringify(currentArray));
            } catch (error) {
            }
          }
          break;
        }
        case ItemChangeType.Array: {
          localStorage.setItem(key, JSON.stringify(x.value));
          break;
        }
      }
    });
  }

  public addToArray(namespace: string, key: string, value: string | number) {
    this.changes.next({key: key, value: value, namespace: namespace, itemType: ItemChangeType.AddToArray});
  }

  public removeFromArray(namespace: string, key: string, value: string | number) {
    this.changes.next({key: key, value: value, namespace: namespace, itemType: ItemChangeType.RemoveFromArray});
  }

  public setString(namespace: string, key: string, value: string) {
    this.changes.next({key: key, value: value, namespace: namespace, itemType: ItemChangeType.String});
  }

  public setBoolean(namespace: string, key: string, value: boolean) {
    this.changes.next({key: key, value: value, namespace: namespace, itemType: ItemChangeType.Bool});
  }

  public setArray(namespace: string, key: string, value: string[] | number[]) {
    this.changes.next({key: key, value: value, namespace: namespace, itemType: ItemChangeType.Array});
  }

  public getString(namespace: string, key: string): string {
    if (this.localStorageAvailable) {
      return localStorage.getItem(`${namespace}__${key}`);
    }
  }

  public getArray(namespace: string, key: string): number[] | string[] {
    if (!this.localStorageAvailable) {
      return [];
    }
    const array = localStorage.getItem(`${namespace}__${key}`);
    if (array) {
      try {
        const arrayParsed = JSON.parse(array);
        if (isArray(arrayParsed)) {
          return arrayParsed;
        } else {
          return [];
        }
      } catch (exc) {
        return [];
      }
    }
    return [];
  }

  public getBoolean(namespace: string, key: string): boolean {
    if (this.localStorageAvailable) {
      const checking = localStorage.getItem(`${namespace}__${key}`);
      if (!checking || checking === 'false') {
        return false;
      }
      return checking === 'true';
    }
  }
}
