import { PlatformLocation } from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'regor-main-entry',
  templateUrl: './main-entry.component.html',
  styleUrls: ['./main-entry.component.scss'],
})
export class MainEntryComponent implements OnInit {

  @Input() public title: string;
  @Input() public description: string;
  @Input() public img: string;
  @Input() public link: string;
  @Input() public externalLink: string;
  @Input() public inNewTab: boolean;
  @Input() public disabled: boolean;


  public gotoLink(): void {
    if (this.externalLink) {
      if (this.inNewTab) {
        window.open(this.externalLink, '_blank');
      } else {
        window.location.href = this.externalLink;
      }
    } else {
      this.router.navigate([this.link]);
    }

  }

  constructor(private router: Router) { }


  public ngOnInit() {
  }

}
