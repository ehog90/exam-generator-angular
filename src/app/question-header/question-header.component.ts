import {Component, OnInit, Input} from '@angular/core';
import {IExamPartDetails, IQuestionEntry} from '../contracts';

@Component({
  selector: 'regor-question-header',
  templateUrl: './question-header.component.html',
  styleUrls: ['./question-header.component.css']
})
export class QuestionHeaderComponent implements OnInit {

  @Input()
  question: IQuestionEntry;

  @Input()
  examPart: IExamPartDetails;

  constructor() { }

  ngOnInit() {
  }

}
