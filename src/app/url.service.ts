import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {IUrls} from './contracts';


@Injectable()
export class UrlService {

  constructor() {
  }

  private static devBaseUrl = 'NOT_USED';
  private static prodBaseUrl = 'NOT_USED';

  private static devUrls: IUrls = {
    shitStorm: 'mocks/shit.json',
    subjectList: 'mocks/subjectList.json',
    subjectDetails: 'mocks/subjectDetails.json',
    exam: 'mocks/examQuestions.json',
    filesForSubject: 'mocks/filesForSubject.json',
    allFiles: 'mocks/allFiles.json',
    questionDetails: 'mocks/questionDetails.json',
    existingReport: 'mocks/existingReport.json',
    report: 'mocks/report.json',
    message: 'mocks/message.json',
    cppQuiz: 'mocks/cpp.json',
    cppResult: 'mocks/cpp.json',
    freeSearch: 'mocks/free-search.json',
    announcements: 'mocks/announcements.json',
    changelog: 'other/changelog.html',
    publicReports: 'mocks/public-reports.json'
  };

  private static prodUrls: IUrls = {
    shitStorm: 'php/shit-endpoint.php',
    subjectList: 'php/subject-list.php',
    subjectDetails: 'php/subject-details.php',
    exam: 'php/exam-query.php',
    filesForSubject: 'php/files.php',
    allFiles: 'php/all-files.php',
    questionDetails: `php/question-details.php`,
    existingReport: 'php/existing-report.php',
    report: 'php/report.php',
    message: 'php/message.php',
    cppQuiz: 'php/cpp.php',
    cppResult: 'php/cpp-result.php',
    freeSearch: 'php/free-search.php',
    announcements: 'php/announcements.php',
    changelog: 'other/changelog.html',
    publicReports: 'php/public-reports.php'
  };

  public static get urls(): IUrls {
    return environment.production ? UrlService.prodUrls: UrlService.devUrls;
  }

  private static get baseUrl(): string {
    return environment.production ? UrlService.prodBaseUrl: UrlService.devBaseUrl;
  }

}
