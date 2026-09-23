import { Component, contentChild, input } from '@angular/core';
import { TabLabelDirective } from '../tab-label';
import { TabContentDirective } from '../tab-content';

@Component({
  selector: 'lib-tab',
  imports: [],
  templateUrl: './tab.html',
  styleUrl: './tab.scss',
})
export class TabComponent {
  readonly value = input.required<string>();
  readonly labelDirective = contentChild(TabLabelDirective);
  readonly contentDirective = contentChild(TabContentDirective);
}
