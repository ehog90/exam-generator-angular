import { Routes } from "@angular/router";
import {
  ContactComponent,
  CppQuizComponent,
  ExamComponent,
  FaqComponent,
  FilesComponent,
  FreeSearchComponent,
  MainComponent,
  MessageSentComponent,
  NotFoundComponent,
  PublicReportsComponent,
  ReportViewerComponent,
  ShitStormComponent
} from "./components";

export const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "not-found", component: NotFoundComponent },
  { path: "message-sent", component: MessageSentComponent },
  { path: "faq", component: FaqComponent },
  { path: "shit-storm", component: ShitStormComponent },
  { path: "all-files", component: FilesComponent },
  { path: "cpp-quiz", component: CppQuizComponent },
  { path: "contact", component: ContactComponent },
  { path: "sent-report/:reportId", component: ReportViewerComponent },
  { path: "exam/:subjectLink/:mode", component: ExamComponent },
  { path: "exam/:subjectLink/:mode/:searchString", component: ExamComponent },
  { path: "free-search", component: FreeSearchComponent },
  { path: "free-search/:searchString", component: FreeSearchComponent },
  { path: "public-reports", component: PublicReportsComponent },
  {
    path: "examReset/:subjectLink/:mode",
    redirectTo: "exam/:subjectLink/:mode"
  },
  { path: "**", redirectTo: "not-found" }
];
