import {Component, OnInit, Input} from '@angular/core';
import {IQuestionEntry, IExamPartDetails} from '../contracts';
import {answerFadingAnimations} from '../constants/animations';

@Component({
  selector: 'regor-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.css'],
  animations: answerFadingAnimations
})
export class QuestionAnswerComponent implements OnInit {

  @Input()
  question: IQuestionEntry;

  @Input()
  examPart: IExamPartDetails;

  @Input()
  visible: boolean;

  constructor() { }

  ngOnInit() {
  }

}
