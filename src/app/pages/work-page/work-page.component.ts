import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-work-page',
  templateUrl: './work-page.component.html',
  styleUrls: ['./work-page.component.scss'],
})
export class WorkPageComponent implements OnInit, OnDestroy {
  constructor(private imageService: ImageService) {}
  subscription = new Subscription();

  isImageUpload = false;

  ngOnInit(): void {
    this.subscription = this.imageService.uploadedImage$.subscribe(image => {
      if (image) {
        this.isImageUpload = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
