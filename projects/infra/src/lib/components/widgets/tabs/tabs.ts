import { Component, contentChildren } from '@angular/core';
import { TabComponent } from './tab/tab';
import { Tab, TabContent, TabList, TabPanel, Tabs } from '@angular/aria/tabs';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'lib-tabs',
  imports: [Tabs, TabList, Tab, TabPanel, TabContent, NgTemplateOutlet],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
})
export class TabsComponent {
  readonly tabs = contentChildren(TabComponent);
}
