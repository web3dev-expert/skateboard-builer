import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  starCount: number = 0;
  interval: any;
  rotate(id: string) {
    let div = document.querySelector(`#${id}`) as HTMLDivElement;
    div.style.transition = '1s';
    div.style.transform = 'rotateY(180deg)';
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {


    this.interval = setInterval(() => {
      let starContainer = document.querySelector('.star-container');
      starContainer?.classList.add('py-5')
      let img = document.createElement('img') as HTMLImageElement;
      img.src = 'assets/home/star.png';
      img.style.width = '50px';
      img.style.height = '50px';
      img.classList.add('m-auto')
      if (this.starCount == 5) {
        starContainer!.innerHTML = ''
        this.starCount=0;
      }
      this.starCount++;
      starContainer?.append(img);
    }, 2000);
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
