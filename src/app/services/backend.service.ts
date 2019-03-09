import { Injectable } from "@angular/core";
import { shuffle } from "lodash";
import { ConnectableObservable, Observable } from "rxjs";
import { map, publishReplay } from "rxjs/operators";
import { UrlService } from "./url.service";

import { HttpClient, HttpParams } from "@angular/common/http";
import {
  IAllFilesResult,
  ICppQuestionsAnswered,
  ICppResult,
  IExam,
  IFilesResult,
  IFreeSearchResult,
  INewMessage,
  INewReport,
  IPublicReport,
  IQuestionDetails,
  IReportResult,
  IShit,
  ISubjectDetails,
  ISubjectMetaSmall
} from "../contracts";
@Injectable()
export class BackendService {
  private _subjectListConnectable: ConnectableObservable<ISubjectMetaSmall[]>;

  constructor(private httpClient: HttpClient) {}
  /* Files */
  /* Files */
  public getFilesForSubject(subjectFolder: string): Observable<IFilesResult> {
    const params = new HttpParams().set("subjectFolder", subjectFolder);
    return this.httpClient.get<IFilesResult>(UrlService.urls.filesForSubject, {
      params: params
    });
  }

  public getAllFiles(): Observable<IAllFilesResult> {
    return this.httpClient.get<IAllFilesResult>(UrlService.urls.allFiles);
  }

  /* Reports */
  public sendReport(newReport: INewReport): Observable<any> {
    return this.httpClient.post(UrlService.urls.report, newReport);
  }

  public sendMessage(newMessage: INewMessage): Observable<any> {
    return this.httpClient.post(UrlService.urls.message, newMessage);
  }

  public getExistingReport(reportId: string): Observable<IReportResult> {
    const params = new HttpParams().set("reportId", reportId);
    return this.httpClient.get<IReportResult>(UrlService.urls.existingReport, {
      params: params
    });
  }

  public getPublicReports(): Observable<IPublicReport[]> {
    return this.httpClient.get<IPublicReport[]>(UrlService.urls.publicReports);
  }

  /* CPP Quiz */
  public submitCppResults(data: ICppQuestionsAnswered): Observable<any> {
    return this.httpClient.post(UrlService.urls.cppResult, data);
  }

  public getCppQuiz(): Observable<ICppResult> {
    return this.httpClient.get<ICppResult>(UrlService.urls.cppQuiz).pipe(
      map((data) => {
        data.averageData.all =
          data.averageData.scoreNeutral +
          data.averageData.scorePassed +
          data.averageData.scoreFailed;
        data.questions = shuffle(data.questions);
        return data;
      })
    );
  }

  /* Shit Storm */
  public getShitStorm(): Observable<IShit[]> {
    return this.httpClient
      .get<IShit[]>(UrlService.urls.shitStorm)
      .pipe(map((x) => shuffle(x)));
  }

  /* Subjects */
  public getSubjectList(): Observable<ISubjectMetaSmall[]> {
    if (!this._subjectListConnectable) {
      const obs = this.httpClient.get(UrlService.urls.subjectList);
      this._subjectListConnectable = <
        ConnectableObservable<ISubjectMetaSmall[]>
      >obs.pipe(publishReplay());
      this._subjectListConnectable.connect();
    }
    return this._subjectListConnectable;
  }

  public getSubjectDetails(subjectLink: string): Observable<ISubjectDetails> {
    const params = new HttpParams().set("subjectLink", subjectLink);
    return this.httpClient.get<ISubjectDetails>(
      UrlService.urls.subjectDetails,
      { params: params }
    );
  }

  public getSubjectDetailsForQuestion(
    questionId: string
  ): Observable<ISubjectDetails> {
    const params = new HttpParams().set("questionId", questionId);
    return this.httpClient.get<ISubjectDetails>(
      UrlService.urls.subjectDetails,
      { params: params }
    );
  }

  public getQuestionData(questionId: string): Observable<IQuestionDetails> {
    const params = new HttpParams().set("questionId", questionId);
    return this.httpClient.get<IQuestionDetails>(
      UrlService.urls.questionDetails,
      { params: params }
    );
  }

  public getRandomExam(subjectId: number): Observable<IExam> {
    const params = new HttpParams()
      .set("all", "false")
      .set("search", "false")
      .set("subjectId", subjectId.toString());
    return this.httpClient.get<IExam>(UrlService.urls.exam, { params: params });
  }

  public searchExamQuestions(
    subjectId: number,
    searchString: string
  ): Observable<IExam> {
    const params = new HttpParams()
      .set("all", "false")
      .set("search", searchString)
      .set("subjectId", subjectId.toString());
    return this.httpClient.get<IExam>(UrlService.urls.exam, { params: params });
  }

  public getAllExamQuestions(subjectId: number): Observable<IExam> {
    const params = new HttpParams()
      .set("all", "true")
      .set("search", "false")
      .set("subjectId", subjectId.toString());
    return this.httpClient.get<IExam>(UrlService.urls.exam, { params: params });
  }

  public freeSearch(
    query: string,
    limit: number
  ): Observable<IFreeSearchResult> {
    const params = new HttpParams()
      .set("query", query)
      .set("limit", limit.toString());
    return this.httpClient.get<IFreeSearchResult>(UrlService.urls.freeSearch, {
      params: params
    });
  }
}
