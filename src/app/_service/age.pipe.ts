import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {

  transform(base: string, exponent: Date): number {
    var timeDiff = Math.abs(Date.now() - Date.parse(base));
    return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    // Math.pow(base, exponent);
  }

}