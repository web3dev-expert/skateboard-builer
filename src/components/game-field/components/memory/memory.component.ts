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
    setTimeout(() => {
      let div = document.getElementById('carte-field') as HTMLDivElement;
      if (div) {

        for (let i = 1; i <= this.remainingCardToFind; i++) {
          const newDiv = document.createElement("div");
          const newContent = document.createTextNode(String(i));
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
          setTimeout(() => {
            div.appendChild(newDiv);
          }, i * 200)
        }
      }
    }, 2000);
  }
  handleClickEvent(event: any) {
    event.preventDefault();
    console.log(event);
  }
}
