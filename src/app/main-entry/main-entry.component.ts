import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'regor-main-entry',
  templateUrl: './main-entry.component.html',
  styleUrls: ['./main-entry.component.scss'],
})
export class MainEntryComponent implements OnInit {

  @Input()
  title: string;
  @Input()
  description: string;
  @Input()
  img: string;
  @Input()
  link: string;
  @Input()
  externalLink: string;
  @Input()
  inNewTab: boolean;

  gotoLink(): void {
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


  ngOnInit() {
  }

}
