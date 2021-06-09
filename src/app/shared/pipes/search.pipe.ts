import { Pipe, PipeTransform } from '@angular/core';
import { IAnnouncement } from '../interfaces/announcement.interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Array<IAnnouncement>, field: string): Array<IAnnouncement> {
    if (!value) {
      return value
    }
    if (!field) {
      return value
    }
    return value.filter(announcement => announcement.title.includes(field));
  }

}
