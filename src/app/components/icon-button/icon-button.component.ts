import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'regor-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {

  @Output()
  public buttonClick = new EventEmitter<boolean>();

  @Input()
  public glyphName: string;

  constructor() { }

  public ngOnInit() {
  }

}
