import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IExamPartBasic, IQuestionEntry, ISubjectMetaSmall} from '../contracts';
import {animate, AUTO_STYLE, state, style, transition, trigger} from '@angular/animations';
import {IKnowService} from '../i-know.service';

@Component({
  selector: 'regor-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  animations: [
    trigger('visibility', [
      state('collapsed', style({
        height: '0px'
      })),
      state('expanded', style({
        height: AUTO_STYLE
      })),
      transition('expanded <=> collapsed', animate('120ms ease-in')),
    ]),
    trigger('knowledge', [
      state('unknown',  style({
        'background-color': 'rgba(0,0,0,0.6)',
        'border-color': AUTO_STYLE
      })),
      state('known', style({
        'background-color': '#303600',
        'border-color': '#F90'
      })),
      transition('unknown <=> known', animate('500ms ease-in')),
    ])
  ]
})
export class QuestionComponent implements OnInit {

  private _known = false;
  @Input()
  question: IQuestionEntry;

  @Input()
  examPart: IExamPartBasic;

  @Input()
  showExamData = false;

  @Input()
  hideTestField = false;

  @Input()
  hideExpandButton = false;

  @Input()
  subject: ISubjectMetaSmall;

  @Output()
  openReport = new EventEmitter<number>();

  get known() {
    return this._known;
  }

  set known(value: boolean) {
    this._known = value;
    if (value) {
      this.iKnowService.setQuestionKnown(this.question.id);
    } else {
      this.iKnowService.setQuestionUnknown(this.question.id);
    }
  }

  constructor(private iKnowService: IKnowService) {

  }

  toggleKnowledge() {
    this.known = !this.known;
  }

  ngOnInit() {
    this._known = this.iKnowService.isQuestionKnown(this.question.id);
  }

}
