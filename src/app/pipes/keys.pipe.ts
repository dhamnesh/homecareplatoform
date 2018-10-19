import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    const keys = [];
    if (value) {
      for (const key in value) {
        keys.push(key);
      }
    }
    return keys;
  }
}
