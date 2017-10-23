import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {PersistenceService} from '../persistence.service';
import {autoExpandNamespace} from '../preference-keys-namespaces';

@Component({
  selector: 'regor-exam-controller',
  templateUrl: './exam-controller.component.html',
  styleUrls: ['./exam-controller.component.scss']
})
export class ExamControllerComponent implements OnInit {
  private _autoExpand: boolean = this.persistenceService.getBoolean(autoExpandNamespace, autoExpandNamespace);

  @Output()
  public onReGenerate = new EventEmitter<boolean>();

  @Output()
  public onAllShow = new EventEmitter<boolean>();

  @Output()
  public onAutoExpandChanged = new EventEmitter<boolean>();

  public get autoExpand(): boolean {
    return this._autoExpand;
  }
  public set autoExpand(value: boolean) {
    this._autoExpand = value;
    this.persistenceService.setBoolean(autoExpandNamespace, autoExpandNamespace, value);
    this.onAutoExpandChanged.emit(value);
  }

  constructor(private persistenceService: PersistenceService) { }
  ngOnInit() {
  }

  public toggleExpandStatus() {
    this.autoExpand = !this.autoExpand;
  }

}
