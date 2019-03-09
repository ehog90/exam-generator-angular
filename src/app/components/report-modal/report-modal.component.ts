import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap";
import { INewReport, IQuestionDetails } from "../../contracts";
import { BackendService } from "../../services";
import { emailValidator } from "../../validators";

@Component({
  selector: "regor-report-modal",
  templateUrl: "./report-modal.component.html",
  styleUrls: ["./report-modal.component.scss"]
})
export class ReportModalComponent implements AfterViewInit {
  public reportForm = this.formBuilder.group({
    reCaptcha: ["", Validators.required],
    email: ["", Validators.compose([Validators.required, emailValidator])],
    name: ["", Validators.required],
    message: [
      "",
      Validators.compose([Validators.required, Validators.minLength(10)])
    ]
  });
  @ViewChild("reportModal") public reportModal: ModalDirective;
  public questionId: string;
  public questionDetails: IQuestionDetails;
  public error: any;
  public isSending = false;
  public messageSent = false;
  public onReady = () => {};
  public onClosed = () => {};

  constructor(
    private formBuilder: FormBuilder,
    private backendService: BackendService
  ) {}

  public ngAfterViewInit(): void {
    this.reportModal.show();
    this.onReady();
    this.backendService
      .getQuestionData(this.questionId)
      .subscribe((questionDetails) => {
        this.questionDetails = questionDetails;
      });
  }

  public submit(): void {
    this.isSending = true;
    const newReport: INewReport = {
      name: this.reportForm.controls["name"].value,
      email: this.reportForm.controls["email"].value,
      message: this.reportForm.controls["message"].value,
      "g-recaptcha-response": this.reportForm.controls["reCaptcha"].value,
      questionId: this.questionId
    };
    this.backendService.sendReport(newReport).subscribe(
      (_) => {
        this.messageSent = true;
      },
      (error) => {
        this.error = error;
        this.isSending = false;
      }
    );
  }
  public close() {
    this.reportModal.hide();
    this.onClosed();
  }
}
