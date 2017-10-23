import { Injectable } from '@angular/core';
import {UrlService} from './url.service';
import {Http} from '@angular/http';
import {IRibbonAnnouncement} from './contracts';

@Injectable()
export class AnnouncementService {

  constructor(
    private urlService: UrlService,
    private http: Http) { }

  public getAnnouncements(): Promise<IRibbonAnnouncement[]> {
    return new Promise((resolve, reject) => {
      this.http.get(UrlService.urls.announcements).subscribe(annnuncements => {
        resolve(annnuncements.json());
      }, error => {
        reject(error);
      });
    });
  }

  public getChangelog(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get(UrlService.urls.changelog).subscribe(changelog => {
        resolve(changelog.text());
      }, error => {
        reject(error);
      });
    });
  }

}
