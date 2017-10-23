import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'regor-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  img: string;

  @Input()
  description: string;

  constructor() { }

  ngOnInit() {
  }

}
