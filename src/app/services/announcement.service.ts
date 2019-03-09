import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { IRibbonAnnouncement } from '../contracts';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AnnouncementService {
  constructor(private http: HttpClient) {}

  public getAnnouncements(): Observable<IRibbonAnnouncement[]> {
    return this.http.get<IRibbonAnnouncement[]>(UrlService.urls.announcements);
  }

  public getChangelog(): Observable<string> {
    return this.http.get(UrlService.urls.changelog, { responseType: 'text' });
  }
}
