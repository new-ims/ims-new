import { Component } from '@angular/core';
import { Widgets } from '../../widgets/widgets';

@Component({
  selector: 'ims-shell',
  imports: [Widgets],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {}
