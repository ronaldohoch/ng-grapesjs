import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeObjectKeys',
  pure: false,
  standalone: true
})
export class PipeObjectKeysPipe implements PipeTransform {

  transform(value: any): any {
    return Object.keys(value)
}

}
