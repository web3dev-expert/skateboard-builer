import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../interfaces/interfaces';
import { AuthService } from '../../../../services/auth.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-memory',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './memory.component.html',
  styleUrl: './memory.component.scss'
})
export class MemoryComponent implements OnInit {

  @Input() game!: number;
  user: User | null = null;
  step: number = 0;
  difficolta: string = '';
  remainingCardToFind: number = 0;
  cards: HTMLDivElement[] = [];
  secondsToFlip: number = 0;
  downgradeSecondsInterval: any = null;
  constructor(private authService: AuthService) {
    this.user = this.authService.getUser();
  }

  ngOnInit(): void {
    this.step = 1
  }


  go(value?: string) {
    this.difficolta = value || this.difficolta;
    if (this.difficolta == 'bassa') this.remainingCardToFind = 5;
    else if (this.difficolta == 'media') this.remainingCardToFind = 10;
    else this.remainingCardToFind = 20;
    this.step++
    if (this.step == 3) this.giveCards();
  }

  giveCards() {
    let div: any = null;
    setTimeout(() => {
      div = document.getElementById('carte-field') as HTMLDivElement;
      if (div) {
        for (let i = 1; i <= this.remainingCardToFind; i++) {
          const newDiv: HTMLDivElement = document.createElement('div');
          const newContent: Node = document.createTextNode(i.toString());
          newDiv.appendChild(newContent);
          newDiv.style.transition = '1s;'
          newDiv.classList.add('personal-card');
          newDiv.classList.add('d-inline');
          newDiv.classList.add('fs-2');
          newDiv.classList.add('border');
          newDiv.classList.add('rounded');
          newDiv.classList.add('m-2');
          newDiv.classList.add('p-5');
          newDiv.classList.add('col-2');
          newDiv.classList.add('personal-card');
          this.cards.push(newDiv);
        }
        for (let i = 0; i <= this.cards.length - 1; i++) {
          let randomNumber = Math.round(Math.random() * this.cards.length - 1);
          if (randomNumber < 0) randomNumber = 0;
          let div = this.cards[i];
          this.cards[i] = this.cards[randomNumber];
          this.cards[randomNumber] = div;
        }
      }
    }, 2000)
    setTimeout(() => {
      for (let i = 0; i <= this.cards.length - 1; i++) {
        setTimeout(() => {
          div.appendChild(this.cards[i]);
          if (i == this.cards.length - 1) this.evaluateSecondsToFlip();
        }, i * 200)
      }
    }, 3500)
  }
  handleClickEvent(event: any) {
    event.preventDefault();
  }

  evaluateSecondsToFlip() {
    switch (this.difficolta) {
      case 'bassa': {
        this.secondsToFlip = 5;
        break;
      }
      case 'media': {
        this.secondsToFlip = 40;
        break;
      }
      case 'alta': {
        this.secondsToFlip = 60;
        break;
      }
      default: {
        break;
      }
    }
    this.downgradeSecondsInterval = setInterval(() => {
      if (this.secondsToFlip != 0) this.secondsToFlip -= 1;
      else this.flipCards();
    }, 1000)
  }

  flipCards() {
    clearInterval(this.downgradeSecondsInterval);
    (document.getElementById('carte-field') as HTMLDivElement)!.childNodes.forEach((child:ChildNode,index:number)=>{
     setTimeout(()=>{
      (child as HTMLDivElement).style.transform = 'rotateX(180deg)'
     },index * 200)    
    });

  }
}
