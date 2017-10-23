import {Component, Input} from '@angular/core';
import {AccordionComponent} from '../accordion/accordion.component';
import {IFileData} from '../contracts';
import {accordionAnimations} from '../constants/animations';

@Component({
  selector: 'regor-accordion-files',
  templateUrl: './accordion-files.component.html',
  styleUrls: ['./accordion-files.component.css'],
  animations: accordionAnimations
})
export class AccordionFilesComponent extends AccordionComponent {

  @Input()
  files: IFileData[];
  @Input()
  hasFileList: boolean;
  @Input()
  header: string;
  @Input()
  expanded: boolean;

  constructor() {
    super();
  }

}
