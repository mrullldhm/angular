import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../model/todo.type';
import { filter } from 'rxjs';

@Pipe({
  name: 'filterTodos',
})
export class FilterTodosPipe implements PipeTransform {
  transform(apiItems: Todo[], searchTerm: string): Todo[] {
    if (!apiItems) {
      return apiItems;
    }
    const text = searchTerm.toLowerCase();
    return apiItems.filter((apiItem) => {
      return apiItem.title.toLowerCase().includes(text);
    });
  }
}
