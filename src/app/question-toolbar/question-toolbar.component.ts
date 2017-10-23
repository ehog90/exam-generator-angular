import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {IQuestionEntry, IExamPartBasic, ISubjectMetaSmall} from '../contracts';
import {DeviceService} from '../device.service';

@Component({
  selector: 'regor-question-toolbar',
  templateUrl: './question-toolbar.component.html',
  styleUrls: ['./question-toolbar.component.scss']
})
export class QuestionToolbarComponent implements OnInit {

  @Output()
  openReport = new EventEmitter<string>();

  @Output()
  knowledgeChange = new EventEmitter<boolean>();

  @Input()
  question: IQuestionEntry;

  @Input()
  examPart: IExamPartBasic;

  @Input()
  subject: ISubjectMetaSmall;

  @Input()
  hideQuestionNumber = false;

  @Input()
  hideTestField = false;

  @Input()
  hideExpandButton = false;

  @Input()
  known = false;

  @Input()
  showExamData = false;

  toggleAnswer() {
    this.question.displayed = !this.question.displayed;
  }

  toggleTestField() {
    this.question.testFieldDisplayed = !this.question.testFieldDisplayed;
  }

  constructor(public deviceService: DeviceService) {
  }

  ngOnInit() {
  }
}
