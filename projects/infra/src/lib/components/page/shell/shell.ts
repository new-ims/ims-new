import { TabList, Tab, Tabs, TabPanel, TabContent } from '@angular/aria/tabs';
import { Component } from '@angular/core';
import { Widgets } from '../../widgets/widgets';

@Component({
  selector: 'ims-shell',
  imports: [TabList, Tab, Tabs, TabPanel, TabContent, Widgets],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {}
