import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { INewMessage } from "../../contracts";
import { BackendService } from "../../services";
import { emailValidator } from "../../validators";

@Component({
  selector: "regor-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"]
})
export class ContactComponent implements OnInit {
  public isSending = false;
  public error: any;

  public messageForm = this.formBuilder.group({
    reCaptcha: ["", Validators.required],
    email: ["", Validators.compose([Validators.required, emailValidator])],
    name: ["", Validators.required],
    subject: ["", Validators.required],
    message: ["", Validators.required]
  });

  public submit(): void {
    this.isSending = true;
    const newMessage: INewMessage = {
      name: this.messageForm.controls["name"].value,
      email: this.messageForm.controls["email"].value,
      message: this.messageForm.controls["message"].value,
      subject: this.messageForm.controls["subject"].value,
      "g-recaptcha-response": this.messageForm.controls["reCaptcha"].value
    };
    this.backendService.sendMessage(newMessage).subscribe(
      () => {
        this.router.navigate(["/message-sent"]);
      },
      (error) => {
        this.error = error;
        this.isSending = false;
      }
    );
  }
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private backendService: BackendService
  ) {}

  public ngOnInit() {}
}
