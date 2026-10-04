import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'ims-busy',
  imports: [],
  templateUrl: './busy.html',
  styleUrl: './busy.scss',
  host: {
    '[style.display]': 'display()',
  },
})
export class Busy {
  readonly condition = input(false, { alias: 'if' });
  readonly label = input('טוען...');

  readonly display = computed(() => (this.condition() ? 'flex' : 'none'));
}
