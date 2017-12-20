import './observable-extensions';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {RootComponent} from './root/root.component';
import {MainComponent} from './main/main.component';
import {MainEntryComponent} from './main-entry/main-entry.component';
import {FaqComponent} from './faq/faq.component';
import {ShitStormComponent} from './shit-storm/shit-storm.component';
import {PageHeaderComponent} from './page-header/page-header.component';
import {FaqEntryComponent} from './faq-entry/faq-entry.component';
import {UrlService} from './url.service';
import {FilesComponent} from './files/files.component';
import {ExamComponent} from './exam/exam.component';
import {AccordionComponent} from './accordion/accordion.component';
import {AccordionFilesComponent} from './accordion-files/accordion-files.component';
import {FileSizeFormatPipe} from './file-size-format.pipe';
import {TooltipModule, ModalModule} from 'ngx-bootstrap';
import {QuestionHeaderComponent} from './question-header/question-header.component';
import {QuestionAnswerComponent} from './question-answer/question-answer.component';
import {ContactComponent} from './contact/contact.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {RecaptchaModule, RecaptchaLoaderService} from 'ng-recaptcha';
import {ExamControllerComponent} from './exam-controller/exam-controller.component';
import {ReportDisplayComponent} from './report-display/report-display.component';
import {ReportViewerComponent} from './report-viewer/report-viewer.component';
import {MessageSentComponent} from './message-sent/message-sent.component';
import {CppQuizComponent} from './cpp-quiz/cpp-quiz.component';
import {ProgressbarModule} from 'ngx-bootstrap';
import {FreeSearchComponent} from './free-search/free-search.component';
import {QuestionToolbarComponent} from './question-toolbar/question-toolbar.component';
import {PersistenceService} from './persistence.service';
import {AnnouncementComponent} from './announcement/announcement.component';
import {AnnouncementService} from './announcement.service';
import {DeviceService} from './device.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RecaptchaFormsModule} from 'ng-recaptcha/recaptcha/recaptcha-forms.module';
import {PublicReportsComponent} from './public-reports/public-reports.component';
import {routes} from './routes';
import {PublicReportDetailsComponent} from './public-report-details/public-report-details.component';
import {IKnowService} from './i-know.service';
import { QuestionComponent } from './question/question.component';
import {BackendService} from './backend.service';
import { BusyMonitorComponent } from './busy-monitor/busy-monitor.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { ReportModalComponent } from './report-modal/report-modal.component';
import {HttpClientModule} from '@angular/common/http';


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
    ReportModalComponent
  ],
  entryComponents: [
    ReportModalComponent
  ],
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
  bootstrap: [RootComponent]
})
export class AppModule {
}
