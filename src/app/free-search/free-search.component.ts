import {
  AfterContentInit, Component, ComponentFactoryResolver, ElementRef, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {Location} from '@angular/common';
import {IFreeSearchResultEntry} from '../contracts';
import {PersistenceService} from '../persistence.service';
import {ModalDirective} from 'ngx-bootstrap';
import 'rxjs/add/operator/debounceTime';
import {BusyMonitorComponent} from '../busy-monitor/busy-monitor.component';
import {BackendService} from '../backend.service';
import {freeSearchAutoExpandKey, freeSearchNamespace} from '../preference-keys-namespaces';
import {ReportModalComponent} from '../report-modal/report-modal.component';

@Component({
  selector: 'regor-free-search',
  templateUrl: './free-search.component.html',
  styleUrls: ['./free-search.component.scss']
})
export class FreeSearchComponent implements AfterContentInit {
  private _autoExpand: boolean;

  public resultLimit = 50;
  public searchString = '';
  public searchObservable = new Subject<string>();
  public result: IFreeSearchResultEntry[];

  public searchInitiated = false;

  @ViewChild('modalTarget', {read: ViewContainerRef})
  public modalTarget;

  @ViewChild('reportModal')
  public reportModal: ModalDirective;

  @ViewChild('searchStringDom')
  public searchField: ElementRef;

  @ViewChild('busyMonitor')
  public busyMonitor: BusyMonitorComponent;

  public get autoExpand(): boolean {
    return this._autoExpand;
  }

  public set autoExpand(value: boolean) {
    this._autoExpand = value;
    this.localStorageService.setBoolean(freeSearchNamespace, freeSearchAutoExpandKey, value);
  }


  constructor(private location: Location,
              private route: ActivatedRoute,
              private backendService: BackendService,
              private localStorageService: PersistenceService,
              private resolver: ComponentFactoryResolver) {
  }

  public openReportModal(questionId: string): void {
    this.modalTarget.clear();
    const reportModalFactory = this.resolver.resolveComponentFactory(ReportModalComponent);
    const modalInstance = this.modalTarget.createComponent(reportModalFactory).instance;
    modalInstance.onClosed = () => {
      this.modalTarget.clear();
    };
    modalInstance.questionId = questionId;
  }


  public ngAfterContentInit() {
    this.route.params.subscribe(examRoute => {
      if (examRoute['searchString']) {
        this.searchString = examRoute['searchString'];
        this.search(this.searchString);
        this.searchField.nativeElement.focus();
      }
    });

    this.searchObservable = new Subject<string>();
    this.searchObservable.debounceTime(600).subscribe(searchString => {
      this.searchString = searchString;
      this.location.replaceState(`free-search/${searchString}`);
      this.search(searchString);
    });
    this.autoExpand = this.localStorageService.getBoolean(freeSearchNamespace, freeSearchAutoExpandKey);
  }

  public resetSearch() {
    this.location.replaceState(`free-search`);
    this.result = null;
  }

  public search(query: string) {
    this.backendService.freeSearch(query, this.resultLimit)
      .subscribeWithMonitor(this.busyMonitor, result => {
        this.result = result.result;
        this.searchInitiated = false;
      }, _ => {
        this.searchInitiated = false;
      });
  }

  public toggleAutoExpand() {
    this.autoExpand = !this.autoExpand;
  }

}
