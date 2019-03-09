import { AfterContentInit, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { debounceTime, filter } from "rxjs/operators";
import { ISubjectMetaSmall } from "../../contracts";
import { createMonitor, monitor } from "../../rx-extensions";
import { BackendService } from "../../services";

@Component({
  selector: "regor-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements AfterContentInit, OnInit {
  public availableSubjects: ISubjectMetaSmall[];
  public searchObservable = new Subject<string>();

  public busyMonitor = createMonitor();

  constructor(private backendService: BackendService, private router: Router) {}
  public ngAfterContentInit(): void {
    this.backendService
      .getSubjectList()
      .pipe(monitor(this.busyMonitor))
      .subscribe((subjectList) => {
        this.availableSubjects = subjectList;
      });
  }
  public ngOnInit() {
    this.searchObservable
      .pipe(
        debounceTime(600),
        filter(searchString => !!searchString)
      )
      .subscribe((searchString) => {
        this.router.navigate(["free-search/", searchString]);
      });
  }
}
