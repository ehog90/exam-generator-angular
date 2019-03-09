import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'regor-faq-entry',
  templateUrl: './faq-entry.component.html',
  styleUrls: ['./faq-entry.component.css']
})
export class FaqEntryComponent implements OnInit {

  @Input()
  public title: string;

  @Input()
  public isOff: boolean;

  constructor() { }

  public ngOnInit() {
  }

}
