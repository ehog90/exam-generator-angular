import {Injectable} from '@angular/core';
import {UrlService} from './url.service';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {shuffle} from 'lodash';
import {ConnectableObservable} from 'rxjs/Rx';
import 'rxjs/add/operator/publishReplay';

import {
  IAllFilesResult, IFilesResult, INewMessage, INewReport, ICppQuestionsAnswered, ICppResult,
  IReportResult, IPublicReport, IShit, ISubjectMetaSmall, ISubjectDetails, IQuestionDetails, IExam, IFreeSearchResult
} from './contracts';


@Injectable()
export class BackendService {
  private _subjectListConnectable: ConnectableObservable<ISubjectMetaSmall[]>;

  constructor(private urlService: UrlService, private http: Http) {
  }

  /* Files */
  public getFilesForSubject(subjectFolder: string): Observable<IFilesResult> {
    return this.http.get(UrlService.urls.filesForSubject, {search: {subjectFolder: subjectFolder}}).mapToJson();
  }

  public getAllFiles(): Observable<IAllFilesResult> {
    return this.http.get(UrlService.urls.allFiles).mapToJson();
  }

  /* Reports */
  public sendReport(newReport: INewReport): Observable<any> {
    return this.http.post(UrlService.urls.report, newReport).mapToJson();
  }

  public sendMessage(newMessage: INewMessage): Observable<any> {
    return this.http.post(UrlService.urls.message, newMessage).mapToJson();
  }

  public getExistingReport(reportId: string): Observable<IReportResult> {
    return this.http.get(UrlService.urls.existingReport, {search: {reportId: reportId}}).mapToJson();
  }

  public getPublicReports(): Observable<IPublicReport[]> {
    return this.http.get(UrlService.urls.publicReports).mapToJson();
  }

  /* CPP Quiz */
  public submitCppResults(data: ICppQuestionsAnswered): Observable<any> {
    return this.http.post(UrlService.urls.cppResult, data).mapToJson();
  }

  public getCppQuiz(): Observable<ICppResult> {
    return this.http.get(UrlService.urls.cppQuiz)
      .map(x => x.json())
      .map(data => {
        data.averageData.all = data.averageData.scoreNeutral + data.averageData.scorePassed + data.averageData.scoreFailed;
        data.questions = shuffle(data.questions);
        return data;
      });
  }

  /* Shit Storm */
  public getShitStorm(): Observable<IShit[]> {
    return this.http.get(UrlService.urls.shitStorm).map(x => x.json()).map(x => shuffle(x));
  }

  /* Subjects */
  public getSubjectList(): Observable<ISubjectMetaSmall[]> {
    if (!this._subjectListConnectable) {
      const obs = this.http.get(UrlService.urls.subjectList).mapToJson();
      this._subjectListConnectable = <ConnectableObservable<ISubjectMetaSmall[]>>obs.publishReplay();
      this._subjectListConnectable.connect();
    }
    return this._subjectListConnectable;
  }

  public getSubjectDetails(subjectLink: string): Observable<ISubjectDetails> {
    return this.http.get(UrlService.urls.subjectDetails, {search: {subjectLink: subjectLink}}).mapToJson();
  }

  public getSubjectDetailsForQuestion(questionId: string): Observable<ISubjectDetails> {
    return this.http.get(UrlService.urls.subjectDetails, {search: {questionId: questionId}}).mapToJson();
  }

  public getQuestionData(questionId: string): Observable<IQuestionDetails> {
    return this.http.get(UrlService.urls.questionDetails, {search: {questionId: questionId}}).mapToJson();
  }

  public getRandomExam(subjectId: number): Observable<IExam> {
    return this.http.get(UrlService.urls.exam, {search: {all: false, search: false, subjectId: subjectId}}).mapToJson();
  }

  public searchExamQuestions(subjectId: number, searchString: string): Observable<IExam> {
    return this.http.get(UrlService.urls.exam, {
      search: {
        all: false,
        search: searchString,
        subjectId: subjectId
      }
    }).mapToJson();
  }

  public getAllExamQuestions(subjectId: number): Observable<IExam> {
    return this.http.get(UrlService.urls.exam, {search: {all: true, search: false, subjectId: subjectId}}).mapToJson();
  }

  public freeSearch(query: string, limit: number): Observable<IFreeSearchResult> {
    return this.http.get(UrlService.urls.freeSearch, {search: {query: query, limit: limit}}).mapToJson();
  }
}
