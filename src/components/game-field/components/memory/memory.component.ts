import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../interfaces/interfaces';
import { AuthService } from '../../../../services/auth.service';
import { NgClass, NgIf } from '@angular/common';
import { SharedModule } from '../../../../shared/modules/shared.module';

@Component({
  selector: 'app-memory',
  standalone: true,
  imports: [NgIf, NgClass, SharedModule],
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
  showSpinner: boolean = false;
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
    this.showSpinner = true;
    let div: any = null;


    setTimeout(() => {
      div = document.getElementById('carte-field') as HTMLDivElement;
      if (div) {
        for (let i = 1; i <= this.remainingCardToFind; i++) {
          const flipCard: HTMLDivElement = document.createElement('div');
          const flipCardInner: HTMLDivElement = document.createElement('div');
          const flipCardFront: HTMLDivElement = document.createElement('div');
          const flipCardBack: HTMLDivElement = document.createElement('div');
          flipCard.style.perspective = '1000px'; /* Remove this if you don't want the 3D effect */
          flipCard.style.cursor = 'pointer!important';
          this.initializeFlipCardStyle(flipCardInner, 'inner');
          this.initializeFlipCardStyle(flipCardFront, 'front');
          const newContent: Node = document.createTextNode(i.toString());
          flipCardFront.appendChild(newContent);
          this.initializeFlipCardStyle(flipCardBack, 'back');
          flipCardInner.appendChild(flipCardFront);
          flipCardInner.appendChild(flipCardBack);
          flipCard.appendChild(flipCardInner);

          flipCard.style.transition = '1s;';
          flipCard.classList.add('fs-2');
          flipCard.classList.add('border');
          flipCard.classList.add('rounded');
          flipCard.classList.add('m-2');
          flipCard.classList.add('p-5');
          flipCard.classList.add('col-2');
          flipCard.id = `flip-${i}`;
          flipCard.addEventListener('click', (event: Event) => this.checkIfRight(event, i));
          this.cards.push(flipCard);
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
      this.showSpinner = false;
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
    (document.getElementById('carte-field') as HTMLDivElement)!.childNodes.forEach((child: ChildNode, index: number) => {
      setTimeout(() => {
        (child as HTMLDivElement).style.transform = 'rotateY(180deg)';
        ((child as HTMLDivElement).childNodes[0] as HTMLDivElement).style.transform = 'rotateY(180deg)';
      }, index * 200)
    });

  }

  initializeFlipCardStyle(div: any, type: string) {
    if (type && type == 'inner') {
      div.style.position = 'relative';
      div.style.width = '100%';
      div.style.height = '100%';
      div.style.textAlign = 'center';
      div.style.transition = 'transform 0.8s';
      div.style.transformStyle = 'preserve-3d';
    } else if (type && type == 'front') {
      div.style.backgroundColor = '#bbb';
    } else if (type && type == 'back') {
      div.style.backgroundColor = 'red';
      div.style.color = 'white';
      div.style.transform = 'rotateY(180deg)';
    } else {

    }
    if (type && (type == 'front' || type == 'back')) {
      div.style.position = 'absolute';
      div.style.width = '100%';
      div.style.height = '100%';
      div.style.webkitBackfaceVisibility = 'hidden'; /* Safari */
      div.style.backfaceVisibility = 'hidden';
    }
  }

  checkIfRight(event: Event, id: number) {
    event.preventDefault();
    console.log(document.getElementById('flip-' + id));
  }
}
