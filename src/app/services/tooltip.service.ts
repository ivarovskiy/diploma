import { Injectable, ComponentRef } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TooltipComponent } from '../components/tooltip/tooltip.component'; // Замените на ваш компонент тултипа

@Injectable({
  providedIn: 'root',
})
export class TooltipService {
  constructor(private overlay: Overlay) {}

  private overlayRef: OverlayRef | undefined;

  showTooltip(x: number, y: number, data: any): void {
    this.hideTooltip();
    const positionStrategy = this.overlay
      .position()
      .global()
      .left(`${x}px`)
      .top(`${y}px`);

    const overlayConfig: OverlayConfig = {
      positionStrategy,
      hasBackdrop: true,
    };

    this.overlayRef = this.overlay.create(overlayConfig);

    // Имитация контента тултипа
    const tooltipRef: ComponentRef<TooltipComponent> = this.overlayRef.attach(
      new ComponentPortal<TooltipComponent>(TooltipComponent)
    );

    // Передаем координаты в компонент тултипа
    tooltipRef.instance.x = x;
    tooltipRef.instance.y = y;
    tooltipRef.instance.data = data;

    // Подписка на событие закрытия тултипа
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeTooltip();
    });
  }

  hideTooltip(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = undefined;
    }
  }

  closeTooltip(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
    }
  }
}
