import { Tab } from '@angular/aria/tabs';
import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-tab',
  imports: [],
  templateUrl: './tab.html',
  styleUrl: './tab.scss',
  hostDirectives: [
    {
      directive: Tab,
      inputs: [
        'value'
      ]
    }],
})
export class TabComponent {
  readonly value = input.required<string>();
}
