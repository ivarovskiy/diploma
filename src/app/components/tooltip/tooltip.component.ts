import { Component, Input } from '@angular/core';
import { IPixel } from 'src/app/models/pixel';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  @Input() data!: IPixel;
  @Input() x: number | undefined;
  @Input() y: number | undefined;
}
