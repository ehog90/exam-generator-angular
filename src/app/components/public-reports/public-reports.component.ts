import { AfterContentInit, Component } from "@angular/core";
import { IPublicReport } from "../../contracts";
import { createMonitor, monitor } from "../../rx-extensions";
import { BackendService } from "../../services";

@Component({
  selector: "regor-public-reports",
  templateUrl: "./public-reports.component.html",
  styleUrls: ["./public-reports.component.css"]
})
export class PublicReportsComponent implements AfterContentInit {
  public publicReports: IPublicReport[] = [];

  public busyMonitor = createMonitor();
  constructor(private backendService: BackendService) {}
  public ngAfterContentInit() {
    this.backendService
      .getPublicReports()
      .pipe(monitor(this.busyMonitor))
      .subscribe((publicReports) => {
        this.publicReports = publicReports;
      });
  }
}
