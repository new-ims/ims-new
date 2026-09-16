import { TabList, Tab, Tabs, TabPanel, TabContent } from '@angular/aria/tabs';
import { Component } from '@angular/core';

@Component({
  selector: 'ims-shell',
  imports: [TabList, Tab, Tabs, TabPanel, TabContent],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {}
