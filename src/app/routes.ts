import {MainComponent} from './main/main.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {MessageSentComponent} from './message-sent/message-sent.component';
import {FaqComponent} from './faq/faq.component';
import {ShitStormComponent} from './shit-storm/shit-storm.component';
import {FilesComponent} from './files/files.component';
import {CppQuizComponent} from './cpp-quiz/cpp-quiz.component';
import {ContactComponent} from './contact/contact.component';
import {ReportViewerComponent} from './report-viewer/report-viewer.component';
import {ExamComponent} from './exam/exam.component';
import {FreeSearchComponent} from './free-search/free-search.component';
import {Routes} from '@angular/router/router';
import {PublicReportsComponent} from './public-reports/public-reports.component';

export const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'message-sent', component: MessageSentComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'shit-storm', component: ShitStormComponent},
  {path: 'all-files', component: FilesComponent},
  {path: 'cpp-quiz', component: CppQuizComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'sent-report/:reportId', component: ReportViewerComponent},
  {path: 'exam/:subjectLink/:mode', component: ExamComponent},
  {path: 'exam/:subjectLink/:mode/:searchString', component: ExamComponent},
  {path: 'free-search', component: FreeSearchComponent},
  {path: 'free-search/:searchString', component: FreeSearchComponent},
  {path: 'public-reports', component: PublicReportsComponent},
  {path: 'examReset/:subjectLink/:mode', redirectTo: 'exam/:subjectLink/:mode'},
  {path: '**', redirectTo: 'not-found'}
];
