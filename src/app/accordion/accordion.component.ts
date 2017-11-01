import {Component, OnInit, Input} from '@angular/core';
import {accordionAnimations} from '../constants/animations';
import {NgStyle} from '@angular/common';

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
