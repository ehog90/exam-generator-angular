/**
 * Created by ehog on 2016. 12. 10..
 */
export interface IShit {
  shitType: string;
  shit: string;
  isSzemlelet: boolean;
}

export interface IUrls {
  shitStorm: string;
  subjectList: string;
  subjectDetails: string;
  questionDetails: string;
  exam: string;
  filesForSubject: string;
  allFiles: string;
  existingReport: string;
  report: string;
  message: string;
  cppQuiz: string;
  cppResult: string;
  freeSearch: string;
  announcements: string;
  changelog: string;
  publicReports: string;
}
export interface ISubjectMetaSmall {
  id?: number;
  semester: string;
  auditor: string;
  paths: string[];
  primaryPath: string;
  name: string;
  icon: string;
}

export interface ISubjectMeta extends ISubjectMetaSmall {
  website: string;
  isHidden: string;
  folder: string;
  groupId: number;
}

export interface ISubjectNotification {
  id: number;
  subjectId: number;
  content: string;
}
export interface ISubjectCopyright {
  id: number;
  subjectId: number;
  subject: string;
  name: string;
  website: string;
}

export interface ISubjectPart {
  id: number;
  subjectId: number;
  name: string;
  qNum: number;
  prettyImages: boolean;
  fullWidth: boolean;
  ordering: number;
  customWeight: number;
  allQuestions: number;
}

export interface IExam {
  error: string;
  exam: IExamPartDetails[];
}

export interface IExamPartBasic {
  name: string;
  fullWidth: boolean;
  prettyImages: boolean;
  ordering: number;
  customWeight: boolean
}

export interface IExamPartDetails extends IExamPartBasic{
  examPartId: number;
  id: number;
  qNum: number;
  customWeight: boolean;
  error: string;
  count: number;
  selectedOnes: IQuestionEntry[];
}

export interface IQuestionEntry {
  id: number;
  number: number;
  name: string;
  questionPic: boolean;
  solPic: boolean;
  solPdf: boolean;
  solHtml: string;
  weight: number;
  displayed?: boolean;
  testFieldDisplayed?: boolean;
}

export interface ISubjectDetails {
  subjectMeta: ISubjectMeta;
  notifs: ISubjectNotification[];
  copyrights: ISubjectCopyright[];
  subjectParts: ISubjectPart[];
}


export interface IFilesResult {
  error: string;
  fileData: IFileData[];
}

export interface IFileData {
  location: string;
  size: number;
  name: string;
  date: {
    created: number;
    modified: number;
  }
}

export interface IAllFilesResult {
  error: string;
  fileData: IAllFilesEntry[];
}

export interface IAllFilesEntry {
  type: string;
  name: string;
  files: IFileData[];
}

export interface IContactMessage {
  email: string;
  name: string;
  subject: string;
  message: string;
}

export interface IQuestionDetails {
  error: string;
  questionData: IQuestionEntry;
  examPartDetails: IExamPartDetails;
  subjectDetails: ISubjectMetaSmall
}

export interface IReportResult {
  error: string;
  reportData: IReportData;
}

export interface IReportData {
  reportId: string;
  reporter: string;
  message: string;
  questionId: number;
  isNew: boolean;
  ts: number;
}

export interface INewReport
{
  name: string;
  email: string;
  message: string;
  questionId: string;
  'g-recaptcha-response': string;
}

export interface INewMessage
{
  name: string;
  email: string;
  message: string;
  'g-recaptcha-response': string;
  subject: string;
}


export interface ICppResult {
  error: string;
  questions: ICppQuestion[];
  averageData: ICppScore;
}

export interface ICppScore {
  scorePassed: number;
  scoreFailed: number;
  scoreNeutral: number;
  all?: number;
}

export interface ICppQuestion {
  question: string;
  hint: string;
  link: string;
  _code: string;
  solution: number | string;
  answerNumber?: number;
  answers: string[];
}

export interface ICppCurrentQuestion {
  index: number;
  question: ICppQuestion;
  tryouts: number;
  showHint?: boolean;
}
export interface ICppQuestionsAnswered {
  correct: number;
  wrong: number;
  unknown: number;
  allTryouts: number;
}
export interface IFreeSearchResult {
  error?: string | null;
  result: IFreeSearchResultEntry[]
}

export interface IFreeSearchResultEntry {
  question: IQuestionEntry;
  examPart: IExamPartBasic;
  subject: ISubjectMetaSmall;
}

export interface IRibbonAnnouncement {
  id: string;
  annClass: string;
  content: string;
  expiry: Date;
  manualExpiry: boolean;
  expired: boolean;
  dismissed?: boolean;
}

export interface IPublicReport {
  publicId: string;
  reporter: string;
  message?: string;
  questionId: number;
  questionName: string;
  time: number;
  examId: number;
  examPartId: number;
  examPartName: string;
  examName: string;
  examLinks: string[];
  examIcon: string;
  resolution: "PENDING" | "RESOLVED" | "REJECTED";
}
