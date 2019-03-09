import { AfterContentInit, Component } from "@angular/core";
import { IAllFilesEntry } from "../../contracts";
import { createMonitor, monitor } from "../../rx-extensions";
import { BackendService } from "../../services";

@Component({
  selector: "regor-files",
  templateUrl: "./files.component.html",
  styleUrls: ["./files.component.css"]
})
export class FilesComponent implements AfterContentInit {
  public files: IAllFilesEntry[];
  public busyMonitor = createMonitor();

  constructor(private backendService: BackendService) {}

  public ngAfterContentInit() {
    this.backendService
      .getAllFiles()
      .pipe(monitor(this.busyMonitor))
      .subscribe((files) => {
        this.files = files.fileData;
      });
  }
}
