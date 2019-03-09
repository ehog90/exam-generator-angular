import { PlatformLocation } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { IFreeSearchResultEntry } from "../../contracts";
import {
  freeSearchAutoExpandKey,
  freeSearchNamespace
} from "../../preference-keys-namespaces";
import { createMonitor, monitor } from "../../rx-extensions";
import { BackendService, PersistenceService } from "../../services";
import { ReportModalComponent } from "../report-modal/report-modal.component";

@Component({
  selector: "regor-free-search",
  templateUrl: "./free-search.component.html",
  styleUrls: ["./free-search.component.scss"]
})
export class FreeSearchComponent implements AfterContentInit {
  private _autoExpand: boolean;

  public resultLimit = 50;
  public searchString = "";
  public searchObservable = new Subject<string>();
  public result: IFreeSearchResultEntry[];

  public searchInitiated = false;

  @ViewChild("modalTarget", { read: ViewContainerRef })
  public modalTarget;

  @ViewChild("reportModal")
  public reportModal: ModalDirective;

  @ViewChild("searchStringDom")
  public searchField: ElementRef;

  public busyMonitor = createMonitor();

  public get autoExpand(): boolean {
    return this._autoExpand;
  }

  public set autoExpand(value: boolean) {
    this._autoExpand = value;
    this.localStorageService.setBoolean(
      freeSearchNamespace,
      freeSearchAutoExpandKey,
      value
    );
  }

  constructor(
    private location: PlatformLocation,
    private route: ActivatedRoute,
    private backendService: BackendService,
    private localStorageService: PersistenceService,
    private resolver: ComponentFactoryResolver
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

  public ngAfterContentInit() {
    this.route.params.subscribe((examRoute) => {
      if (examRoute["searchString"]) {
        this.searchString = examRoute["searchString"];
        this.search(this.searchString);
        this.searchField.nativeElement.focus();
      }
    });

    this.searchObservable = new Subject<string>();
    this.searchObservable.pipe(debounceTime(600)).subscribe((searchString) => {
      this.searchString = searchString;
      this.location.replaceState(`free-search/${searchString}`, null, null);
      this.search(searchString);
    });
    this.autoExpand = this.localStorageService.getBoolean(
      freeSearchNamespace,
      freeSearchAutoExpandKey
    );
  }

  public resetSearch() {
    this.location.replaceState(`free-search`, null, null);
    this.result = null;
  }

  public search(query: string) {
    this.backendService
      .freeSearch(query, this.resultLimit)
      .pipe(monitor(this.busyMonitor))
      .subscribe(
        (result) => {
          this.result = result.result;
          this.searchInitiated = false;
        },
        (_) => {
          this.searchInitiated = false;
        }
      );
  }

  public toggleAutoExpand() {
    this.autoExpand = !this.autoExpand;
  }
}
