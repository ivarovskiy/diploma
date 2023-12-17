import { Component } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(private imageService: ImageService) {}

  invertButton(): void {
    this.imageService.setInvertColors(true);
  }

  scaleButton(scale: number): void {
    this.imageService.setScaleImage(scale);
  }

  clear(state: boolean): void {
    this.imageService.setClear(state);
  }
}
