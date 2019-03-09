import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'regor-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input()
  public title: string;

  @Input()
  public img: string;

  @Input()
  public description: string;

  constructor() { }

  public ngOnInit() {
  }

}
