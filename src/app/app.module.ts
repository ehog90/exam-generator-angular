import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";
import { RecaptchaLoaderService, RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/recaptcha/recaptcha-forms.module';
import { ModalModule, ProgressbarModule, TooltipModule } from "ngx-bootstrap";
import { AppComponent } from "./app.component";
import {
  AccordionComponent,
  AccordionFilesComponent,
  AnnouncementComponent,
  BusyMonitorComponent,
  ContactComponent,
  CppQuizComponent,
  ExamComponent,
  ExamControllerComponent,
  FaqComponent,
  FaqEntryComponent,
  FilesComponent,
  FreeSearchComponent,
  IconButtonComponent,
  MainComponent,
  MainEntryComponent,
  MessageSentComponent,
  NotFoundComponent,
  PageHeaderComponent,
  PublicReportsComponent,
  PublicReportDetailsComponent,
  QuestionAnswerComponent,
  QuestionComponent,
  QuestionHeaderComponent,
  QuestionToolbarComponent,
  ReportDisplayComponent,
  ReportModalComponent,
  ReportViewerComponent,
  RootComponent,
  ShitStormComponent
} from "./components";
import { FileSizeFormatPipe } from "./pipes";
import { routes } from "./routes";
import {
  AnnouncementService,
  BackendService,
  DeviceService,
  IKnowService,
  PersistenceService,
  UrlService
} from "./services";

@NgModule({
  declarations: [
    RootComponent,
    MainComponent,
    MainEntryComponent,
    FaqComponent,
    ShitStormComponent,
    PageHeaderComponent,
    FaqEntryComponent,
    FilesComponent,
    ExamComponent,
    AccordionComponent,
    AccordionFilesComponent,
    FileSizeFormatPipe,
    QuestionHeaderComponent,
    QuestionAnswerComponent,
    ContactComponent,
    NotFoundComponent,
    ExamControllerComponent,
    ReportDisplayComponent,
    ReportViewerComponent,
    MessageSentComponent,
    CppQuizComponent,
    FreeSearchComponent,
    QuestionToolbarComponent,
    AnnouncementComponent,
    PublicReportsComponent,
    PublicReportDetailsComponent,
    QuestionComponent,
    BusyMonitorComponent,
    IconButtonComponent,
    ReportModalComponent,
    AppComponent
  ],
  entryComponents: [ReportModalComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    BrowserModule,
    HttpClientModule,
    TooltipModule.forRoot(),
    ProgressbarModule,
    ModalModule,
    BrowserAnimationsModule
  ],
  providers: [
    UrlService,
    PersistenceService,
    AnnouncementService,
    DeviceService,
    RecaptchaLoaderService,
    IKnowService,
    BackendService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
