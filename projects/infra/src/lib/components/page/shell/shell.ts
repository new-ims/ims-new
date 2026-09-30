import { Component } from '@angular/core';
import { Widgets } from '../../widgets/widgets';
import { TabContent } from '@angular/aria/tabs';

@Component({
  selector: 'ims-shell',
  imports: [Widgets],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {}
