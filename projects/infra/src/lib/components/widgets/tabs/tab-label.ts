import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[libTabLabel]'
})
export class TabLabelDirective {
    readonly template = inject(TemplateRef);
}