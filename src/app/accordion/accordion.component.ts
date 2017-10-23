import {Component, OnInit, Input} from '@angular/core';
import {accordionAnimations} from '../constants/animations';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'regor-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  animations: accordionAnimations
})
export class AccordionComponent implements OnInit {
  @Input()
  header: string;
  @Input()
  id: string;
  @Input()
  extraHeaderStyle: NgStyle;
  @Input()
  expanded = false;
  toggle() {
    this.expanded = !this.expanded;
  }
  constructor() { }
  ngOnInit() {
  }

}
