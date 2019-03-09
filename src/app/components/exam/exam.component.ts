import { PlatformLocation } from "@angular/common";
import {
  AfterContentInit,
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { IExam, IFileData, ISubjectDetails } from "../../contracts";
import { autoExpandNamespace } from "../../preference-keys-namespaces";
import { createMonitor, monitor } from "../../rx-extensions";
import { BackendService, PersistenceService } from "../../services";
import { ReportModalComponent } from "../report-modal/report-modal.component";

@Component({
  selector: "regor-exam",
  templateUrl: "./exam.component.html",
  styleUrls: ["./exam.component.scss"]
})
export class ExamComponent implements AfterContentInit {
  private static MODE_RANDOM = "random";
  private static MODE_ALL = "all";
  private static MODE_SEARCH = "search";

  @ViewChild("modalTarget", { read: ViewContainerRef }) public modalTarget;

  public autoExpand: boolean = this.persistenceService.getBoolean(
    autoExpandNamespace,
    autoExpandNamespace
  );
  public subjectStringId: string;
  public subjectNumericId: number;
  public modeSubject: Subject<string>;
  public currentMode: string;
  public subjectDetails: ISubjectDetails;
  public headerText: string;
  public searchString: string;
  public searchObservable = new Subject<string>();
  public examResult: IExam;
  public files: IFileData[] = [];
  public subjectBusyMonitor = createMonitor();
  public examBusyMonitor = createMonitor();

  public static validateExamMode(mode: string) {
    return (
      mode === ExamComponent.MODE_RANDOM ||
      mode === ExamComponent.MODE_ALL ||
      mode === ExamComponent.MODE_SEARCH
    );
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: PlatformLocation,
    private persistenceService: PersistenceService,
    private resolver: ComponentFactoryResolver,
    private backendService: BackendService
  ) {}

  public openReportModal(questionId: string): void {
    this.modalTarget.clear();
    const reportModalFactory = this.resolver.resolveComponentFactory(
      ReportModalComponent
    );
    const modalInstance = this.modalTarget.createComponent(reportModalFactory)
      .instance;
    modalInstance.onClosed = () => {
      this.modalTarget.clear();
    };
    modalInstance.questionId = questionId;
  }

  public setUpSearchListener() {
    this.searchObservable.complete();
    this.searchObservable = new Subject<string>();
    this.searchObservable.pipe(debounceTime(600)).subscribe((searchString) => {
      this.searchString = searchString;
      this.location.replaceState(
        `exam/${this.subjectStringId}/search/${searchString}`,
        null,
        null
      );
      this.modeSubject.next(ExamComponent.MODE_SEARCH);
    });
  }

  public randomExam() {
    this.location.replaceState(
      `exam/${this.subjectStringId}/random`,
      null,
      null
    );
    this.headerText = "Random kérdéssor";
    this.searchString = null;
    this.backendService
      .getRandomExam(this.subjectNumericId)
      .pipe(monitor(this.examBusyMonitor))
      .subscribe((res) => {
        this.examResult = res;
      });
  }

  public allQuestions() {
    this.location.replaceState(`exam/${this.subjectStringId}/all`, null, null);
    this.searchString = null;
    this.headerText = "Összes kérdés";
    this.backendService
      .getAllExamQuestions(this.subjectNumericId)
      .pipe(monitor(this.examBusyMonitor))
      .subscribe((res) => {
        this.examResult = res;
      });
  }

  public ngAfterContentInit() {
    this.route.params.subscribe((examRoute) => {
      this.subjectStringId = examRoute["subjectLink"];
      this.backendService
        .getSubjectDetails(this.subjectStringId)
        .pipe(monitor(this.subjectBusyMonitor))
        .subscribe(
          (subjectDetails) => {
            this.backendService
              .getFilesForSubject(subjectDetails.subjectMeta.folder)
              .subscribe((files) => (this.files = files.fileData));
            this.subjectNumericId = subjectDetails.subjectMeta.id;
            this.modeSubject = new Subject<string>();
            this.subjectDetails = subjectDetails;
            if (!ExamComponent.validateExamMode(examRoute["mode"])) {
              this.router.navigate([`exam/${this.subjectStringId}/random`]);
            }
            if (examRoute["searchString"]) {
              this.searchString = examRoute["searchString"];
            }
            this.modeSubject.subscribe((mode) => {
              this.currentMode = mode;
              this.examResult = null;
              switch (mode) {
                case ExamComponent.MODE_SEARCH:
                  this.headerText = `Keresési találatok`;
                  this.backendService
                    .searchExamQuestions(
                      this.subjectNumericId,
                      this.searchString
                    )
                    .pipe(monitor(this.examBusyMonitor))
                    .subscribe((res) => (this.examResult = res));
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
            this.modeSubject.next(examRoute["mode"]);
          },
          (_) => {
            this.router.navigate(["main"]);
          }
        );
      this.modeSubject = examRoute["displayMode"];
    });
  }
  public onAutoExpandChanged(value: boolean) {
    this.autoExpand = value;
  }

  public resetSearch() {
    this.searchObservable.complete();
    this.modeSubject.next(ExamComponent.MODE_RANDOM);
    this.location.replaceState(
      `exam/${this.subjectStringId}/random`,
      null,
      null
    );
  }
}
