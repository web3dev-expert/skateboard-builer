import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent implements OnInit {

  @Input() width: string = '';
  @Input() height: string = '';
  @Input() baseColor: string = ''
  div!: HTMLDivElement;
  insideSpinner!: HTMLDivElement;
  insideSpinner2!: HTMLDivElement;
  ngOnInit(): void {
    this.initializateSpinner();
  }

  initializateSpinner() {
    this.div = document.getElementsByClassName('spinner')[0] as HTMLDivElement;
    this.div.style.width = this.width;
    this.div.style.height = this.height;

    this.insideSpinner = document.getElementsByClassName('inside-spinner')[0] as HTMLDivElement;
    this.insideSpinner.style.borderTop =`4px solid ${this.baseColor}`;
    this.insideSpinner.style.borderRight =`4px solid ${this.baseColor}`;

    this.insideSpinner2 = document.getElementsByClassName('inside-spinner-2')[0] as HTMLDivElement;
    this.insideSpinner2.style.borderTop =`4px solid ${this.baseColor}`;
    this.insideSpinner2.style.borderLeft =`4px solid ${this.baseColor}`;

  }

}
