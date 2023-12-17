import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-pixel-info',
  templateUrl: './pixel-info.component.html',
  styleUrls: ['./pixel-info.component.scss'],
})
export class PixelInfoComponent implements OnInit, OnDestroy {
  pixels: any;
  subscription = new Subscription();

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.subscription = this.imageService.pixels$.subscribe(pixel => {
      this.pixels = pixel;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
