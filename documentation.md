# Creating Angular Application

### Install Angular CLI
`npm i -g @angular/cli`

### Check CLI version
`ng --version`

### Create an app
`ng new "project name"`

### Create an app with some configuration
`ng new "project name" --inline-style --inline-template`

<!-- -------------------------------------------------------------- -->

# Angular Components

### Create a component (src/app)
`ng g c "component name"`

`ng g c "new folder/component name"`

### Import component
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

### Signal() - Parent to Parent
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

### Input() - Parent to Child
```
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
---------------------------------------------------------------
src/app/home/home.html
    <p>home works!</p>
    <app-greeting [greetingMessage]="homeMessage()"/> 
```

<!-- -------------------------------------------------------------- -->

# Event Listener

### 
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
