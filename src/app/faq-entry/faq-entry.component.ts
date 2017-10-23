import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'regor-faq-entry',
  templateUrl: './faq-entry.component.html',
  styleUrls: ['./faq-entry.component.css']
})
export class FaqEntryComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  isOff: boolean;

  constructor() { }

  ngOnInit() {
  }

}
