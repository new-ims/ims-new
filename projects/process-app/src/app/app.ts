import { Component, computed } from '@angular/core';
import { FakeModels } from '@fake-models';
import { injectProcessStore, PageComponents } from '@infra';
import { Shared } from '@infra';

@Component({
  selector: 'app-root',
  imports: [Shared, PageComponents],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly #processStore = injectProcessStore<FakeModels.FakeProcesses>();

  readonly steps = computed(() => this.#processStore.stepsVm());
  readonly infos = computed(() => this.#processStore.infosVm());

  constructor() {
  }

  enableAllSteps() {
    this.#processStore.enableAllSteps();
  }

  disableAllSteps() {
    this.#processStore.disableAllSteps();
  }
}
