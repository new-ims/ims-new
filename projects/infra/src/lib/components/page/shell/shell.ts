import { Component, effect, inject } from '@angular/core';
import { Widgets } from '../../widgets/widgets';
import { ProcessStore } from '../../../stores';
import { Shared } from '@infra';

@Component({
  selector: 'ims-shell',
  imports: [Widgets, Shared],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  readonly processStore = inject(ProcessStore);

  constructor() {
    effect(() => {
      console.log('This is the selected step name:', this.processStore.stepsVm().selectedStepName);
      console.log('This is the selected info id:', this.processStore.infosVm().selectedInfoId);
    });
  }


}
