# Creating Angular Application

#### Install Angular CLI

- `npm i -g @angular/cli`

#### Check CLI version

- `ng --version`

#### Create Angular app

- `ng new "project name"`

#### Create an app with inline configuration

- `ng new "project name" --inline-style --inline-template`

<!-- -------------------------------------------------------------- -->

# Angular Components

#### Create a component (src/app)

- `ng g c "component name"`
- `ng g c "folder name/component name"`

#### Import component

```
src/app/app.ts
    import { Component, signal } from '@angular/core';
    import { RouterOutlet } from '@angular/router';
    import { Header } from './components/header/header';
    import { Home } from './home/home';

    @Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, Header, Home],
    templateUrl: './app.html',
    styleUrl: './app.scss'
    })
    export class App {
    protected readonly title = signal('first-ng-app');
    }
---------------------------------------------------------------
src/app/app.html
    <app-header />

    <main>
    <app-home />
    </main>
```

<!-- -------------------------------------------------------------- -->

# Data Binding

#### Signal() - Parent to Parent

```
src/app/components/header/header.ts
    import { Component, signal } from '@angular/core';

    @Component({
    selector: 'app-header',
    imports: [],
    templateUrl: './header.html',
    styleUrl: './header.scss',
    })
    export class Header {
    title = signal('My First Angular App');
    }
---------------------------------------------------------------
src/app/components/header/header.html
    <header>
    <nav>
        {{ title() }}
    </nav>
    </header>
```

<!-- -------------------------------------------------------------- -->

# Passing Data From Parent To Child

#### Input() - Parent to Child

```
src/app/home/home.html
    <p>home works!</p>

    <app-greeting [greetingMessage]="homeMessage()"/>
---------------------------------------------------------------
src/app/home/home.ts
    import { Component, signal } from '@angular/core';
    import { Counter } from '../components/counter/counter';
    import { Greeting } from '../components/greeting/greeting';

    @Component({
    selector: 'app-home',
    standalone: true,
    imports: [Counter, Greeting],
    templateUrl: './home.html',
    styleUrl: './home.scss',
    })
    export class Home {
    homeMessage = signal('Hello World');
    }
---------------------------------------------------------------
src/app/components/greeting/greeting.ts
    import { Component, input } from '@angular/core';

    @Component({
    selector: 'app-greeting',
    imports: [],
    templateUrl: './greeting.html',
    styleUrl: './greeting.scss',
    })
    export class Greeting {
    greetingMessage = input('');
    }
```

<!-- -------------------------------------------------------------- -->

# Event Listener

####

```
src/app/home/home.html
    <p>home works!</p>

    <app-greeting [greetingMessage]="homeMessage()" />

    <input type="text" (keyup)="keyUpHandler($event)" />
---------------------------------------------------------------
src/app/home/home.ts
    import { Component, signal } from '@angular/core';
    import { Counter } from '../components/counter/counter';
    import { Greeting } from '../components/greeting/greeting';

    @Component({
    selector: 'app-home',
    standalone: true,
    imports: [Counter, Greeting],
    templateUrl: './home.html',
    styleUrl: './home.scss',
    })

    export class Home {
    homeMessage = signal('Hello World');

    keyUpHandler(event: KeyboardEvent) {
        console.log(`User typing ${event.key} in the input box`);
    }
    }
```

<!-- -------------------------------------------------------------- -->

# Reactive State Management

####

```
src/app/compoenents/counter/counter.html
    <h2>Counter!</h2>

    <p>Counter value: {{ counterValue() }}</p>

    <div>
    <button (click)="increment()">Increment</button>
    <button (click)="reset()">Reset</button>
    <button (click)="decrement()">Decrement</button>
    </div>
---------------------------------------------------------------
src/app/compoenents/counter/counter.ts
    import { Component, signal } from '@angular/core';

    @Component({
    selector: 'app-counter',
    standalone: true,
    imports: [],
    templateUrl: './counter.html',
    styleUrl: './counter.scss',
    })
    export class Counter {
    counterValue = signal(0);

    increment() {
        this.counterValue.update((val) => val + 1);
    }

    decrement() {
        this.counterValue.update((val) => val - 1);
    }

    reset() {
        this.counterValue.set(0);
    }
    }
```

<!-- -------------------------------------------------------------- -->

# Routing - RouterOutlet

#### router-outlet

```
src/app/app.html
    <app-header />

    <main>
    <router-outlet />
    </main>
---------------------------------------------------------------
src/app/app.ts
    import { Component, signal } from '@angular/core';
    import { RouterOutlet } from '@angular/router';
    import { Header } from './components/header/header';

    @Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, Header],
    templateUrl: './app.html',
    styleUrl: './app.scss'
    })
    export class App {
    protected readonly title = signal('first-ng-app');
    }
---------------------------------------------------------------
src/app/app.routes.ts
    import { Routes } from '@angular/router';

    export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
        return import('./home/home').then((m) => m.Home);
        },
    },
    {
        path: 'todos',
        loadComponent: () => {
        return import('./todos/todos').then((m) => m.Todos);
        },
    },
    ];
```

#### routerLink

```
src/app/components/header/header.html
    <header>
    <nav>
        <span routerLink="/">{{ title() }}</span>
        <ul>
        <li routerLink="/todos">Todos</li>
        </ul>
    </nav>
    </header>
---------------------------------------------------------------
src/app/components/header/header.ts
    import { Component, signal } from '@angular/core';
    import { RouterLink } from '@angular/router';

    @Component({
    selector: 'app-header',
    imports: [RouterLink],
    templateUrl: './header.html',
    styleUrl: './header.scss',
    })
    export class Header {
    title = signal('My First Angular App');
}
```

<!-- -------------------------------------------------------------- -->

# Angular Services

#### Purpose

```
    An Angular service is a file where you put shared code.

    It is used when:

    You want to reuse the same code in many components

    You want to get data from an API

    You want to save or share data

    You want to keep components clean
```

#### Create Angular service

- `ng g service "folder name/service name"`

```
src\app\todos\todos.html
    <h2>Todos!</h2>

    <h4>Example 1</h4>
    <p>
    {{todoItems()[0].title}}
    </p>
    <p>
    {{todoItems()[1].title}}
    </p>

    <h4>Example 2</h4>
    @for (todoItem of todoItems(); track todoItem.id) {
        <p>{{todoItem.title}}</p>
    }
---------------------------------------------------------------
src\app\todos\todos.ts
    import { Component, inject, OnInit, signal } from '@angular/core';
    import { TodosService } from '../services/todos.service';
    import { Todo } from '../model/todo.type';

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

    ngOnInit(): void {
        console.log(this.todoService.todoItems);
        this.todoItems.set(this.todoService.todoItems)
    }
    }
---------------------------------------------------------------
src\app\services\todos.service.ts
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
    }d
---------------------------------------------------------------
src\app\model\todo.type.ts
    export type Todo = {
    userId: number;
    completed: boolean;
    title: string;
    id: number;
    };
---------------------------------------------------------------
```

<!-- -------------------------------------------------------------- -->

# HTTP - Angular Service

#### Fake API url

- `https://jsonplaceholder.typicode.com/`

####

```
src\app\todos\todos.html
    <h2>Todos!</h2>

    <h4>Example 1</h4>
    <p>
    {{ todoItems()[0].title }}
    </p>
    <p>
    {{ todoItems()[1].title }}
    </p>

    <h4>Example 2</h4>
    @for (todoItem of todoItems(); track todoItem.id) {
    <p>{{ todoItem.title }}</p>
    }

    <h4>Example 3</h4>
    @for (apiItem of apiItems(); track apiItem.id) {
    <p>{{ apiItem.title }}</p>
    }
---------------------------------------------------------------
src\app\todos\todos.ts
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
---------------------------------------------------------------
src\app\services\api.service.ts
    import { HttpClient } from '@angular/common/http';
    import { inject, Injectable } from '@angular/core';
    import { Todo } from '../model/todo.type';

    @Injectable({
    providedIn: 'root',
    })
    export class ApiService {
    http = inject(HttpClient);

    getTodosFromApi() {
        const url = 'https://jsonplaceholder.typicode.com/todos';

        return this.http.get<Array<Todo>>(url)
    }
    }
---------------------------------------------------------------
src\app\app.config.ts
    import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
    import { provideRouter } from '@angular/router';

    import { routes } from './app.routes';
    import { provideHttpClient } from '@angular/common/http';

    export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient()
    ]
    };
```

<!-- -------------------------------------------------------------- -->

# Angular Directive
