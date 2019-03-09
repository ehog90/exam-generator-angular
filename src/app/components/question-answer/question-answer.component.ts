import { Component, Input, OnInit } from '@angular/core';
import { answerFadingAnimations } from '../../constants';
import { IExamPartDetails, IQuestionEntry } from '../../contracts';


@Component({
  selector: 'regor-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.css'],
  animations: answerFadingAnimations
})
export class QuestionAnswerComponent implements OnInit {

  @Input()
  public question: IQuestionEntry;

  @Input()
  public examPart: IExamPartDetails;

  @Input()
  public visible: boolean;

  constructor() { }

  public ngOnInit() {
  }

}
