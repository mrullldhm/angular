import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Todo } from '../model/todo.type';
import { ApiService } from '../services/api.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
})

export class Todos implements OnInit {
  todoService = inject(TodosService);
  todoItems = signal<Array<Todo>>([]);

  apiService = inject(ApiService);
  apiItems = signal<Array<Todo>>([]);

  ngOnInit(): void {
    console.log(this.todoService.todoItems);

    this.todoItems.set(this.todoService.todoItems);

    this.apiService
      .getTodosFromApi()
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        })
      )
      .subscribe((todosApi) => {
        this.apiItems.set(todosApi);
      });
  }
}
