import { Component, computed, effect } from '@angular/core';
import { FakeModels } from '@fake-models';
import { injectProcessStore } from '@infra';
import { Shared } from '@infra';

@Component({
  selector: 'app-root',
  imports: [Shared],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly #processStore = injectProcessStore<FakeModels.FakeProcesses>();

  readonly tabs = computed(() => this.#processStore.stepsVm());

  constructor() {
    effect(() => {
      const s = this.#processStore.process();
      console.log('App: process changed', s);
    });
  }

  enableAllSteps() {
    this.#processStore.enableAllSteps();
  }

  disableAllSteps() {
    this.#processStore.disableAllSteps();
  }
}
