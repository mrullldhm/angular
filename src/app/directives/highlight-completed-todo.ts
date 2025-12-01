import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appHighlightCompletedTodo]',
  standalone: true,
})
export class HighlightCompletedTodo {
  isCompleted = input(false);

  el = inject(ElementRef);

  stylesEffect = effect(() => {
    if (this.isCompleted()) {
      this.el.nativeElement.style.backgroundColor = '#d3f9d8';
    } else {
      this.el.nativeElement.style.backgroundColor = '#fff';
    }
  });
}
