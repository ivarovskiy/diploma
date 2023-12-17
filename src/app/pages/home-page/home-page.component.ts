import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements AfterViewInit {
  link!: HTMLElement | null;
  logo!: HTMLImageElement | null;

  ngAfterViewInit(): void {
    this.link = document.querySelector('.link');
    this.logo = document.querySelector('.logo');

    if (this.link !== null && this.logo !== null) {
      this.link.addEventListener('mouseenter', (event: any) => {
        console.log('mouse enter');
        this.logo!.src = './assets/images/coolFace.png';
      });

      this.link.addEventListener('mouseout', (event: any) => {
        this.logo!.src = './assets/images/face.png';
      });
    }
  }
}
