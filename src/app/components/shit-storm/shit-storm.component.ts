import { AfterContentInit, Component } from "@angular/core";
import { timer, Observable, Subscription } from "rxjs";
import { IShit } from "../../contracts";
import { createMonitor, monitor } from "../../rx-extensions";
import { BackendService } from "../../services";

@Component({
  selector: "regor-shit-storm",
  templateUrl: "./shit-storm.component.html",
  styleUrls: ["./shit-storm.component.css"]
})
export class ShitStormComponent implements AfterContentInit {
  constructor(private backendService: BackendService) {}

  public shitStormData: IShit[];
  public currentShit: IShit;
  public shitIndex = 0;
  public timer: Observable<any>;
  public timerSubscription: Subscription;

  public busyMonitor = createMonitor();

  public nextShit(): void {
    ++this.shitIndex;
    this.currentShit = this.shitStormData[this.shitIndex];
    if (this.shitIndex >= this.shitStormData.length) {
      this.getShits();
    }
  }

  public setUpTimer() {
    this.timer = timer(0, 1000);
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timerSubscription = this.timer.subscribe(() => {
      this.nextShit();
    });
  }

  public cancelTimer(): void {
    this.timer = null;
    this.timerSubscription.unsubscribe();
  }

  public getShits() {
    this.backendService
      .getShitStorm()
      .pipe(monitor(this.busyMonitor))
      .subscribe((shitStormData) => {
        this.shitStormData = shitStormData;
        this.shitIndex = 0;
        this.currentShit = this.shitStormData[this.shitIndex];
      });
  }

  public ngAfterContentInit() {
    this.getShits();
  }
}
