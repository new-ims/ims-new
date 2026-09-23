import { Component, contentChildren } from '@angular/core';
import { TabComponent } from './tab/tab';
import { Tab, TabContent, TabList, TabPanel, Tabs } from '@angular/aria/tabs';

@Component({
  selector: 'lib-tabs',
  imports: [Tabs, TabList, Tab, TabPanel, TabContent],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
})
export class TabsComponent {
  readonly tabs = contentChildren(TabComponent);

}
