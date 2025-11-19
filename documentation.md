<!-- Install Angular CLI -->

npm i -g @angular/cli

<!-- Check CLI version -->

ng --version

<!-- Create an app -->

ng new "project name"

<!-- Create an app with some configuration -->

ng new "project name" --inline-style --inline-template

<!-- Create a component (src/app) -->

ng g c "component name"
ng g c "new folder/component name"

<!-- Import component -->

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
```

```
    src/app/app.html
    <app-header />

    <main>
    <app-home />
    </main>
```
