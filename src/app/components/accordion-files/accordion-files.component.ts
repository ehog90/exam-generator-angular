import {Component, Input} from '@angular/core';
import { accordionAnimations } from '../../constants';
import { IFileData } from '../../contracts';
import {AccordionComponent} from '../accordion/accordion.component';

@Component({
  selector: 'regor-accordion-files',
  templateUrl: './accordion-files.component.html',
  styleUrls: ['./accordion-files.component.css'],
  animations: accordionAnimations
})
export class AccordionFilesComponent extends AccordionComponent {

  @Input()
  public files: IFileData[];
  @Input()
  public hasFileList: boolean;
  @Input()
  public header: string;
  @Input()
  public expanded: boolean;

  constructor() {
    super();
  }

}
