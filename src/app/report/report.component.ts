import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IQuestionDetails, INewReport} from '../contracts';
import {FormBuilder, Validators} from '@angular/forms';
import {emailValidator} from '../validators';
import {BackendService} from '../backend.service';

@Component({
  selector: 'regor-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  questionId: string;
  questionDetails: IQuestionDetails;
  error: any;
  isSending = false;
  messageSent = false;

  @Output()
  close = new EventEmitter<boolean>();

  reportForm = this.formBuilder.group({
    reCaptcha: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, emailValidator])],
    name: ['', Validators.required],
    message: ['', Validators.compose([Validators.required, Validators.minLength(10)])]
  });

  constructor(private formBuilder: FormBuilder,
              private backendService: BackendService) {
  }

  ngOnInit() {
    this.backendService.getQuestionData(this.questionId).subscribe(questionDetails => {
      this.questionDetails = questionDetails;
    });
  }

  submit(): void {
    this.isSending = true;
    const newReport: INewReport = {
      name: this.reportForm.controls['name'].value,
      email: this.reportForm.controls['email'].value,
      message: this.reportForm.controls['message'].value,
      'g-recaptcha-response': this.reportForm.controls['reCaptcha'].value,
      questionId: this.questionId
    };
    this.backendService.sendReport(newReport)
      .subscribe(_ => {
        this.messageSent = true;
      }, error => {
        this.error = error;
        this.isSending = false;
      });
  }


}
