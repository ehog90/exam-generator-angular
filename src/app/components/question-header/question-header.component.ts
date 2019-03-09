import { Component, Input, OnInit } from "@angular/core";
import { IExamPartDetails, IQuestionEntry } from "../../contracts";

@Component({
  selector: "regor-question-header",
  templateUrl: "./question-header.component.html",
  styleUrls: ["./question-header.component.css"]
})
export class QuestionHeaderComponent implements OnInit {
  @Input()
  public question: IQuestionEntry;

  @Input()
  public examPart: IExamPartDetails;

  constructor() {}

  public ngOnInit() {}
}
