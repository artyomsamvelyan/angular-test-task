import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortPipe implements PipeTransform {

  transform(sortArray: any[], key: string, orderBy: string = 'ASC'): any[] {
    return sortArray.sort((item, nextItem) => {
        return item[key] < nextItem[key]
            ? orderBy === 'DESC'
                ? 1 : -1
            : orderBy === 'DESC'
                ? -1 : 1;
    });
  }
}
