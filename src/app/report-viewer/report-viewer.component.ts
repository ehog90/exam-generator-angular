import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IReportData, IQuestionDetails} from '../contracts';
import {BackendService} from '../backend.service';

@Component({
  selector: 'regor-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.css']
})
export class ReportViewerComponent implements OnInit {

  reportId: string;
  existingReport: IReportData;
  questionDetails: IQuestionDetails;

  constructor(private route: ActivatedRoute,
              private backendService: BackendService) { }

  ngOnInit() {
    this.route.params.subscribe(questionRoute => {
      this.reportId = questionRoute['reportId'];
      this.backendService.getExistingReport(this.reportId).subscribe(er => {
        this.backendService.getQuestionData(this.existingReport.questionId + '')
          .subscribe(questionDetails => {this.questionDetails = questionDetails; });
      });
    });
  }

}
