import {
  animate,
  state,
  style,
  transition,
  trigger,
  AUTO_STYLE
} from "@angular/animations";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  IExamPartBasic,
  IQuestionEntry,
  ISubjectMetaSmall
} from "../../contracts";
import { IKnowService } from "../../services";

@Component({
  selector: "regor-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.scss"],
  animations: [
    trigger("visibility", [
      state(
        "collapsed",
        style({
          height: "0px"
        })
      ),
      state(
        "expanded",
        style({
          height: AUTO_STYLE
        })
      ),
      transition("expanded <=> collapsed", animate("120ms ease-in"))
    ]),
    trigger("knowledge", [
      state(
        "unknown",
        style({
          "background-color": "rgba(0,0,0,0.6)",
          "border-color": AUTO_STYLE
        })
      ),
      state(
        "known",
        style({
          "background-color": "#303600",
          "border-color": "#F90"
        })
      ),
      transition("unknown <=> known", animate("500ms ease-in"))
    ])
  ]
})
export class QuestionComponent implements OnInit {
  private _known = false;
  @Input()
  public question: IQuestionEntry;

  @Input()
  public examPart: IExamPartBasic;

  @Input()
  public showExamData = false;

  @Input()
  public hideTestField = false;

  @Input()
  public hideExpandButton = false;

  @Input()
  public subject: ISubjectMetaSmall;

  @Output()
  public openReport = new EventEmitter();

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

  constructor(private iKnowService: IKnowService) {}

  public toggleKnowledge() {
    this.known = !this.known;
  }

  public ngOnInit() {
    this._known = this.iKnowService.isQuestionKnown(this.question.id);
  }
}
