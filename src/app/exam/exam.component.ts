import {
  Component, ViewChild,
  ViewContainerRef, ComponentFactoryResolver, AfterContentInit
} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {ISubjectDetails, IExam, IFileData} from '../contracts';
import {Subject} from 'rxjs/Subject';
import {Location} from '@angular/common';
import 'rxjs/add/operator/debounceTime';
import {BackendService} from '../backend.service';
import {BusyMonitorComponent} from '../busy-monitor/busy-monitor.component';
import {autoExpandNamespace} from '../preference-keys-namespaces';
import {PersistenceService} from '../persistence.service';
import {ReportModalComponent} from '../report-modal/report-modal.component';

@Component({
  selector: 'regor-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent implements AfterContentInit {

  private static MODE_RANDOM = 'random';
  private static MODE_ALL = 'all';
  private static MODE_SEARCH = 'search';

  @ViewChild('modalTarget', {read: ViewContainerRef}) modalTarget;

  public autoExpand: boolean = this.persistenceService.getBoolean(autoExpandNamespace, autoExpandNamespace);
  public subjectStringId: string;
  public subjectNumericId: number;
  modeSubject: Subject<string>;
  currentMode: string;
  subjectDetails: ISubjectDetails;
  headerText: string;
  searchString: string;
  searchObservable = new Subject<string>();
  examResult: IExam;
  files: IFileData[] = [];

  @ViewChild('subjectBusyMonitor')
  subjectBusyMonitor: BusyMonitorComponent;
  @ViewChild('examBusyMonitor')
  examBusyMonitor: BusyMonitorComponent;

  static validateExamMode(mode: string) {
    return mode === ExamComponent.MODE_RANDOM || mode === ExamComponent.MODE_ALL || mode === ExamComponent.MODE_SEARCH;
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private persistenceService: PersistenceService,
              private resolver: ComponentFactoryResolver,
              private backendService: BackendService) {
  }

  openReportModal(questionId: string): void {
    this.modalTarget.clear();
    const reportModalFactory = this.resolver.resolveComponentFactory(ReportModalComponent);
    const modalInstance = this.modalTarget.createComponent(reportModalFactory).instance;
    modalInstance.onClosed = () => {
      this.modalTarget.clear();
    };
    modalInstance.questionId = questionId;
  }

  setUpSearchListener() {
    this.searchObservable.complete();
    this.searchObservable = new Subject<string>();
    this.searchObservable.debounceTime(600).subscribe(searchString => {
      this.searchString = searchString;
      this.location.replaceState(`exam/${this.subjectStringId}/search/${searchString}`);
      this.modeSubject.next(ExamComponent.MODE_SEARCH);
    });
  }

  randomExam() {
    this.location.replaceState(`exam/${this.subjectStringId}/random`);
    this.headerText = 'Random kérdéssor';
    this.searchString = null;
    this.backendService.getRandomExam(this.subjectNumericId)
      .subscribeWithMonitor(this.examBusyMonitor, res => {
        this.examResult = res;
      });
  }

  allQuestions() {
    this.location.replaceState(`exam/${this.subjectStringId}/all`);
    this.searchString = null;
    this.headerText = 'Összes kérdés';
    this.backendService.getAllExamQuestions(this.subjectNumericId)
      .subscribeWithMonitor(this.examBusyMonitor, res => {
        this.examResult = res;
      });
  }

  ngAfterContentInit() {
    this.route.params.subscribe(examRoute => {
      this.subjectStringId = examRoute['subjectLink'];
      this.backendService.getSubjectDetails(this.subjectStringId)
        .subscribeWithMonitor(this.subjectBusyMonitor, subjectDetails => {
          this.backendService.getFilesForSubject(subjectDetails.subjectMeta.folder).subscribe(files => this.files = files.fileData);
          this.subjectNumericId = subjectDetails.subjectMeta.id;
          this.modeSubject = new Subject<string>();
          this.subjectDetails = subjectDetails;
          if (!ExamComponent.validateExamMode(examRoute['mode'])) {
            this.router.navigate([`exam/${this.subjectStringId}/random`]);
          }
          if (examRoute['searchString']) {
            this.searchString = examRoute['searchString'];
          }
          this.modeSubject.subscribe(mode => {
            this.currentMode = mode;
            this.examResult = null;
            switch (mode) {
              case ExamComponent.MODE_SEARCH:
                this.headerText = `Keresési találatok`;
                this.backendService.searchExamQuestions(this.subjectNumericId, this.searchString)
                  .subscribeWithMonitor(this.examBusyMonitor, res => this.examResult = res);
                break;
              case ExamComponent.MODE_ALL:
                this.allQuestions();
                break;
              case ExamComponent.MODE_RANDOM:
                this.randomExam();
                break;
              default:
                break;
            }
          });
          this.modeSubject.next(examRoute['mode']);
        }, _ => {
          this.router.navigate(['main']);
        });
      this.modeSubject = examRoute['displayMode'];
    });
  }
  public onAutoExpandChanged(value: boolean) {
    this.autoExpand = value;
  }

  resetSearch() {
    this.searchObservable.complete();
    this.modeSubject.next(ExamComponent.MODE_RANDOM);
    this.location.replaceState(`exam/${this.subjectStringId}/random`);
  }
}
