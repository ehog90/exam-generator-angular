import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  IExamPartBasic,
  IQuestionEntry,
  ISubjectMetaSmall
} from "../../contracts";
import { DeviceService } from "../../services";

@Component({
  selector: "regor-question-toolbar",
  templateUrl: "./question-toolbar.component.html",
  styleUrls: ["./question-toolbar.component.scss"]
})
export class QuestionToolbarComponent implements OnInit {
  @Output()
  public openReport = new EventEmitter();

  @Output()
  public knowledgeChange = new EventEmitter();

  @Input()
  public question: IQuestionEntry;

  @Input()
  public examPart: IExamPartBasic;

  @Input()
  public subject: ISubjectMetaSmall;

  @Input()
  public hideQuestionNumber = false;

  @Input()
  public hideTestField = false;

  @Input()
  public hideExpandButton = false;

  @Input()
  public known = false;

  @Input()
  public showExamData = false;

  public toggleAnswer() {
    this.question.displayed = !this.question.displayed;
  }

  public toggleTestField() {
    this.question.testFieldDisplayed = !this.question.testFieldDisplayed;
  }

  constructor(public deviceService: DeviceService) {}

  public ngOnInit() {}
}
