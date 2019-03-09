import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSizeFormat'
})
export class FileSizeFormatPipe implements PipeTransform {

  public transform(value: number, args?: any): any {
    if (value < 500) {
      return `${value} B`;
    } else if (value < 1024 * 512) {
      return `${(value / 1024).toFixed(2)} KiB`;
    }
    return `${(value / 1024 / 1024).toFixed(2)} MiB`;
  }

}
