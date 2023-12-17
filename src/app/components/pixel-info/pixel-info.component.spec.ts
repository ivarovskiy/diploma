import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelInfoComponent } from './pixel-info.component';

describe('PixelInfoComponent', () => {
  let component: PixelInfoComponent;
  let fixture: ComponentFixture<PixelInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PixelInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PixelInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
