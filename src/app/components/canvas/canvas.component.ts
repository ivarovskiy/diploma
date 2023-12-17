import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { TooltipService } from 'src/app/services/tooltip.service';
import { ImageService } from 'src/app/services/image.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> | undefined;

  private subscription = new Subscription();
  private uploadedImage: Blob | null = null;

  constructor(
    private tooltipService: TooltipService,
    private imageService: ImageService
  ) {}

  ngAfterViewInit(): void {
    // Подписка на изменения в сервисе
    this.subscription = this.imageService.invertColors$.subscribe(
      shouldInvertColors => {
        if (shouldInvertColors) {
          this.invertColors();
        }
      }
    );
    this.subscription.add(
      this.imageService.scaleImage$.subscribe(scale => {
        if (scale) {
          this.scaleImage(scale);
        }
      })
    );
    this.subscription.add(
      this.imageService.clear$.subscribe(clear => {
        if (clear) {
          this.clear();
        }
      })
    );
    this.subscription.add(
      this.imageService.uploadedImage$.subscribe(image => {
        this.uploadedImage = image;

        this.drawUploadedCanvas();
      })
    );
  }

  drawUploadedCanvas(): void {
    if (this.canvas) {
      if (this.uploadedImage) {
        const canvas = this.canvas.nativeElement;
        const context = canvas.getContext('2d');

        const image = new Image();

        //create url from blob ---> temp
        const imageUrl = URL.createObjectURL(this.uploadedImage);

        console.log('image url - ', imageUrl);
        image.src = imageUrl;

        image.onload = () => {
          if (context !== null) {
            // задаем полотну размер как и у изображения чтобы не было мисскликов
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, canvas.width, canvas.height);

            URL.revokeObjectURL(imageUrl);
          }
        };
      }
    }
  }

  onMouseMove(event: MouseEvent): void {
    if (this.canvas) {
      const canvas = this.canvas.nativeElement;

      const [coordX, coordY] = this.getCoordsInfo(event, canvas);
      const data = this.getPixelInfo(canvas, [coordX, coordY]);

      const x: number = event.pageX;
      const y: number = event.pageY;

      if (data) {
        this.tooltipService.showTooltip(x + 10, y + 10, data);
      }
    }
  }

  onMouseLeave(event: any) {
    this.tooltipService.hideTooltip();
  }

  onMouseClick(event: any): void {
    if (this.canvas) {
      const canvas = this.canvas.nativeElement;
      const context = canvas.getContext('2d');

      const [coordX, coordY] = this.getCoordsInfo(event, canvas);
      const data = this.getPixelInfo(canvas, [coordX, coordY]);

      if (context) {
        //В точці сканування рисує круг (точку) червоного кольору з радіусом 2 пікселя

        context.beginPath();
        context.arc(coordX, coordY, 2, 0, 2 * Math.PI, true);
        context.fillStyle = '#ff0000';
        context.fill();

        //Обводе точку сканування кольором червоного кольору

        context.beginPath();
        context.arc(coordX, coordY, 5, 0, 2 * Math.PI, true);
        context.strokeStyle = '#ff0000';
        context.lineWidth = 2;
        context.stroke();

        if (data) {
          this.imageService.scan(data);
        }
      }
    }
  }

  getCoordsInfo(event: any, canvas: any) {
    const scaleX =
      canvas.width / document.querySelector('.canvas')!.clientWidth;
    const scaleY =
      canvas.height / document.querySelector('.canvas')!.clientHeight;

    const coordX: number = Math.round(event.pageX * scaleX);
    const coordY: number = Math.round(event.pageY * scaleY);

    return [coordX, coordY];
  }

  getPixelInfo(canvas: any, coords: any) {
    const context = canvas.getContext('2d');
    const [coordX, coordY] = coords;

    if (context) {
      const imageData = context.getImageData(coordX, coordY, 1, 1);
      const rgbR = imageData.data[0];
      const rgbG = imageData.data[1];
      const rgbB = imageData.data[2];
      const transparent = imageData.data[3];
      const shine = rgbR + rgbG + rgbB;

      const obj = {
        // id,
        coordX,
        coordY,
        rgbR,
        rgbG,
        rgbB,
        transparent,
        shine,
      };

      return obj;
    }

    return null;
  }

  clear(): void {
    if (this.canvas) {
      const canvas = this.canvas.nativeElement;
      const context = canvas.getContext('2d');

      if (context !== null) {
        // очистка через сервис
        this.imageService.clear(context, canvas.width, canvas.height);
      }
    }
  }

  invertColors(): void {
    if (this.canvas) {
      const canvas = this.canvas.nativeElement;
      const context = canvas.getContext('2d');

      if (context !== null) {
        // Инвертирование цветов через сервис
        this.imageService.invertColors(context, canvas.width, canvas.height);
      }
    }
  }

  scaleImage(scale: number): void {
    if (this.canvas) {
      const canvas = this.canvas.nativeElement;
      const context = canvas.getContext('2d');

      if (context !== null) {
        // Масштабирование изображения через сервис
        this.imageService.scaleImage(
          context,
          canvas.width,
          canvas.height,
          scale
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
