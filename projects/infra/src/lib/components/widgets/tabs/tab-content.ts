import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[libTabContent]',
})
export class TabContentDirective {
  readonly template = inject(TemplateRef);
}
