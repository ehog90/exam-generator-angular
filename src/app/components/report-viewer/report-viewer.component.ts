import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IQuestionDetails, IReportData } from '../../contracts';
import { BackendService } from '../../services';

@Component({
  selector: 'regor-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.css']
})
export class ReportViewerComponent implements OnInit {

  public reportId: string;
  public existingReport: IReportData;
  public questionDetails: IQuestionDetails;

  constructor(private route: ActivatedRoute,
              private backendService: BackendService) { }

  public ngOnInit() {
    this.route.params.subscribe(questionRoute => {
      this.reportId = questionRoute['reportId'];
      this.backendService.getExistingReport(this.reportId).subscribe( existingReport => {
        this.existingReport = existingReport.reportData;
        this.backendService.getQuestionData(this.existingReport.questionId + '')
          .subscribe(questionDetails => {this.questionDetails = questionDetails; });
      });
    });
  }

}
