import {Pipe, PipeTransform} from '@angular/core';

/*
 * Limit the string length
 * Takes a length argument that defaults to 1.
 * Usage:
 *   string | lengthLimit:length
 * Example:
 *   {{ 1234567890more9999 | lengthLimit:10 }}
 *   formats to: 1234567890
*/
@Pipe({name: 'lengthLimit'})
export class LengthLimitPipe implements PipeTransform {
  transform(str: string, length: number): string {
    return str.slice(0, isNaN(length) ? 1 : length);
  }
}
