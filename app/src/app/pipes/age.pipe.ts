import { Pipe, PipeTransform } from '@angular/core';
import { differenceInYears } from 'date-fns';

@Pipe({ name: 'age' })
export class AgePipe implements PipeTransform {
  transform(dateOfBirth?: string): string {
    if (!dateOfBirth) {
      return '';
    }

    return differenceInYears(new Date(), new Date(dateOfBirth)).toString();
  }
}
