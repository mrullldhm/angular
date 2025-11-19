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
