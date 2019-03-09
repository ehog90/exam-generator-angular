import { Component, EventEmitter, OnInit, Output} from "@angular/core";
import { autoExpandNamespace } from "../../preference-keys-namespaces";
import { PersistenceService } from "../../services";

@Component({
  selector: "regor-exam-controller",
  templateUrl: "./exam-controller.component.html",
  styleUrls: ["./exam-controller.component.scss"]
})
export class ExamControllerComponent implements OnInit {
  private _autoExpand: boolean = this.persistenceService.getBoolean(
    autoExpandNamespace,
    autoExpandNamespace
  );

  // TODO: refactor
  @Output()
  public onReGenerate = new EventEmitter();

  @Output()
  public onAllShow = new EventEmitter();

  @Output()
  public onAutoExpandChanged = new EventEmitter();

  public get autoExpand(): boolean {
    return this._autoExpand;
  }
  public set autoExpand(value: boolean) {
    this._autoExpand = value;
    this.persistenceService.setBoolean(
      autoExpandNamespace,
      autoExpandNamespace,
      value
    );
    this.onAutoExpandChanged.emit(value);
  }

  constructor(private persistenceService: PersistenceService) {}
  public ngOnInit() {}

  public toggleExpandStatus() {
    this.autoExpand = !this.autoExpand;
  }
}
