import { Component, computed, inject, signal } from '@angular/core';
import { ConfigStore } from '@infra';
import { Shared } from '@infra';

@Component({
  selector: 'app-root',
  imports: [Shared],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly configStore = inject(ConfigStore);

  readonly tabs = computed(() => this.configStore.configVm().stepTabs);
}
