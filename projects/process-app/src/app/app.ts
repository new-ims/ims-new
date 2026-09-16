import { Component, computed, effect } from '@angular/core';
import { FakeModels } from '@fake-models';
import { injectProcessStore } from '@infra';
import { Shared } from '@infra';
import { LoginStore } from '../../../infra/src/lib/stores/login/login.store';
import { inject } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [Shared],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly #processStore = injectProcessStore<FakeModels.FakeProcesses>();
  readonly userStore = inject(LoginStore);

  readonly steps = computed(() => this.#processStore.stepsVm());
  readonly infos = computed(() => this.#processStore.infosVm());

  constructor() {
    effect(() => {
      const s = this.#processStore.process();
      console.log('App: process changed', s);
      console.log('App: process stepsVm', this.#processStore.isProcessDisabled());
      console.log('App: process infosVm', this.#processStore.infosVm());
    });
  }

  enableAllSteps() {
    this.#processStore.enableAllSteps();
  }

  disableAllSteps() {
    this.#processStore.disableAllSteps();
  }
}
