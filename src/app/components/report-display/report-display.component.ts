import {Component, Input, OnInit} from '@angular/core';
import { IQuestionDetails } from '../../contracts';

@Component({
  selector: 'regor-report-display',
  templateUrl: './report-display.component.html',
  styleUrls: ['./report-display.component.css']
})
export class ReportDisplayComponent implements OnInit {

  @Input()
  public questionDetails: IQuestionDetails;

  constructor() { }

  public ngOnInit() {
  }

}
