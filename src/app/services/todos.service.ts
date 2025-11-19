import { Injectable } from '@angular/core';
import { Todo } from '../model/todo.type';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todoItems: Array<Todo> = [
    {
      title: 'Finish TypeScript lesson',
      id: 0,
      userId: 1,
      completed: false,
    },
    {
      title: 'Finish Angular lesson',
      id: 1,
      userId: 1,
      completed: true,
    },
  ];
}
