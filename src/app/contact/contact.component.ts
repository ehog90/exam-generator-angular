import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {emailValidator} from '../validators';
import {INewMessage} from '../contracts';
import {Router} from '@angular/router';
import {BackendService} from '../backend.service';

@Component({
  selector: 'regor-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  isSending = false;
  error: any;

  messageForm = this.formBuilder.group({
    reCaptcha: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, emailValidator])],
    name: ['', Validators.required],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });

  submit(): void {
    this.isSending = true;
    const newMessage: INewMessage = {
      name: this.messageForm.controls['name'].value,
      email: this.messageForm.controls['email'].value,
      message: this.messageForm.controls['message'].value,
      subject: this.messageForm.controls['subject'].value,
      'g-recaptcha-response': this.messageForm.controls['reCaptcha'].value,
    };
    this.backendService.sendMessage(newMessage).subscribe(() => {
      this.router.navigate(['/message-sent']);
    }, (error) => {
      this.error = error;
      this.isSending = false;
    });
  }
  constructor(public formBuilder: FormBuilder, private router: Router, private backendService: BackendService) {
  }

  ngOnInit() {

  }

}
