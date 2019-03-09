import {NgStyle} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import { accordionAnimations } from '../../constants';

@Component({
  selector: 'regor-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  animations: accordionAnimations
})
export class AccordionComponent implements OnInit {
  @Input() public header: string;
  @Input() public id: string;
  @Input() public extraHeaderStyle: NgStyle;
  @Input() public expanded = false;
  public toggle() {
    this.expanded = !this.expanded;
  }
  constructor() { }
  public ngOnInit() {
  }
}
