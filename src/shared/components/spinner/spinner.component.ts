import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent implements OnInit {

  @Input() width: number = 150;
  @Input() height: number = 150;
  @Input() baseColor: string = ''
  div!: HTMLDivElement;
  insideSpinner!: HTMLDivElement;
  insideSpinner2!: HTMLDivElement;
  points: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  ngOnInit(): void {
    this.initializateSpinner();
  }

  initializateSpinner() {
    switch (this.baseColor) {
      case ('red'): {
        this.baseColor = this.baseColor;
      }
        break;
      case ('green'): {
        this.baseColor = this.baseColor;
      }
        break;
      case ('blue'): {
        this.baseColor = this.baseColor;
      }
        break;
      case ('black'): {
        this.baseColor = this.baseColor;
      }
        break;
      default: {
        this.baseColor = 'red';
      }
    }
    this.div = document.getElementsByClassName('spinner')[0] as HTMLDivElement;
    this.div.style.width = this.width < 250 ? '250px' : this.width > 350 ? '350px' : `${this.width}px`;
    this.div.style.height = this.height < 250 ? '250px' : this.height > 350 ? '350px' : `${this.height}px`;

    this.insideSpinner = document.getElementsByClassName('inside-spinner')[0] as HTMLDivElement;
    this.insideSpinner.style.border = `4px solid ${this.baseColor || 'reds'}`;
    this.insideSpinner.style.width = this.width < 250 ? '150px' : this.width > 350 ? '250px' : `${this.width - 100}px`;
    this.insideSpinner.style.height = this.height < 250 ? '150px' : this.height > 350 ? '250px' : `${this.height - 100}px`;

  }

}
