import {Component, OnInit, Input} from '@angular/core';
import {IQuestionDetails} from '../contracts';

@Component({
  selector: 'regor-report-display',
  templateUrl: './report-display.component.html',
  styleUrls: ['./report-display.component.css']
})
export class ReportDisplayComponent implements OnInit {

  @Input()
  questionDetails: IQuestionDetails;

  constructor() { }

  ngOnInit() {
  }

}
