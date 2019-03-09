import { Injectable } from '@angular/core';

declare const window;

@Injectable()
export class DeviceService {
  constructor() { }
  public get isAppleIos(): boolean {
      return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }
}
