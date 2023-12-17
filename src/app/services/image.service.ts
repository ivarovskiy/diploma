import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPixel } from '../models/pixel';
import { TooltipService } from './tooltip.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private tooltipService: TooltipService) {}

  private uploadedImageSubject = new BehaviorSubject<Blob | null>(null);
  private invertColorsSubject = new BehaviorSubject<boolean>(false);
  private scaleImageSubject = new BehaviorSubject<number>(1);
  private clearSubject = new BehaviorSubject<boolean>(false);

  uploadedImage$: Observable<Blob | null> =
    this.uploadedImageSubject.asObservable();
  invertColors$: Observable<boolean> = this.invertColorsSubject.asObservable();
  clear$: Observable<boolean> = this.clearSubject.asObservable();
  scaleImage$: Observable<number> = this.scaleImageSubject.asObservable();
  private pixels: any = [];
  private pixelsSubject = new BehaviorSubject<any>([]);
  pixels$: Observable<any> = this.pixelsSubject.asObservable();

  scan(obj: IPixel) {
    this.pixels.push(obj);
    this.pixelsSubject.next(this.pixels);
  }

  clear(context: CanvasRenderingContext2D, width: number, height: number) {
    this.clearSubject.next(false);
    this.uploadedImageSubject.next(null);
    this.invertColorsSubject.next(false);
    this.scaleImageSubject.next(0);
    this.pixels = [];
    this.pixelsSubject.next([]);
    this.tooltipService.closeTooltip();
    this.tooltipService.hideTooltip();

    context.clearRect(0, 0, width, height);
  }

  uploadImage(base64Image: string, fileType: string): void {
    // Преобразование base64-строки в Blob
    const byteCharacters = atob(base64Image.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: fileType });

    this.uploadedImageSubject.next(blob);
    this.pixels = [];
    this.pixelsSubject.next([]);
  }

  getUploadedImage(): Blob | null {
    return this.uploadedImageSubject.value;
  }

  setClear(value: boolean): void {
    this.clearSubject.next(value);
  }

  invertColors(
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ): void {
    // Получение данных изображения с Canvas
    const imageData = context.getImageData(0, 0, width, height);
    const data = imageData.data;

    // Инвертирование цветов пикселей
    for (let i = 0; i < data.length; i += 4) {
      // Инвертирование красного, зеленого и синего каналов
      data[i] = 255 - data[i]; // Красный
      data[i + 1] = 255 - data[i + 1]; // Зеленый
      data[i + 2] = 255 - data[i + 2]; // Синий
    }

    // Обновление Canvas с обновленными данными
    context.putImageData(imageData, 0, 0);
  }

  setInvertColors(value: boolean): void {
    this.invertColorsSubject.next(value);
  }

  scaledWidth = 0;
  scaledHeight = 0;

  scaleImage(
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    scale: number
  ): void {
    this.scaledWidth = width + scale;
    this.scaledHeight = this.scaledWidth / height + height;

    // Создаем временный canvas для масштабирования
    const tempCanvas = document.createElement('canvas');
    const tempContext = tempCanvas.getContext('2d');

    if (tempContext) {
      tempCanvas.width = this.scaledWidth;
      tempCanvas.height = this.scaledHeight;

      // Рисуем изображение на временный canvas с новыми размерами
      tempContext.drawImage(
        context.canvas,
        0,
        0,
        width,
        height,
        0,
        0,
        this.scaledWidth,
        this.scaledHeight
      );

      // Очищаем основной canvas
      context.clearRect(0, 0, width, height);

      // Масштабируем основной canvas из временного canvas
      context.drawImage(tempCanvas, 0, 0, this.scaledWidth, this.scaledHeight);
    }
  }

  setScaleImage(value: number): void {
    this.scaleImageSubject.next(value);
  }
}
