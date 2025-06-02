import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { GamefieldService } from '../../../../services/gamefield.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../interfaces/interfaces';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TreeKeyManager } from '@angular/cdk/a11y';

@Component({
  selector: 'app-mah-jong',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule, NgClass, MatTooltipModule],
  templateUrl: './mah-jong.component.html',
  styleUrl: './mah-jong.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MahJongComponent implements OnInit, OnDestroy, AfterContentChecked {
  @Input() game: number = 0;
  user: User | null = null;
  step: number = 1;
  gioco: any = null;
  difficoltaPartitaForm: FormGroup = new FormGroup({});
  difficoltaAvailables: number[] = [1, 2, 3, 4];
  startCount: boolean = false;
  countTimer: any;
  firstFloor: string[] = [];
  secondFloor: string[] = [];
  thirdFloor: string[] = [];
  fourthFloor: string[] = [];
  allCards: string[] = [];
  mixedAllCards: string[] = [];
  @ViewChild('base', { static: false }) base: any;
  constructor(private gameFieldService: GamefieldService, private authService: AuthService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.getGioco();
    this.initializeForms();
  }

  initializeForms() {
    this.difficoltaPartitaForm = new FormGroup({
      difficolta: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(3)])
    });
  }
  getGioco() {
    this.gameFieldService.getGiocoById(this.game).subscribe({
      next: (value: any) => {
        this.gioco = value;
      }
    });
  }
  toNumber(value: string) {
    return Number(value);
  }
  setDifficolta(value: number) {
    this.difficoltaPartitaForm.controls['difficolta'].setValue(value);
    this.difficoltaPartitaForm.updateValueAndValidity();
  }
  letsPlay() {
    this.step = 2;
    this.startCount = true;
    this.countTimer = setTimeout(() => {
      this.startCount = false;
      this.giveCards();
    }, 4000)
  }
  indietro() {
    clearTimeout(this.countTimer)
    this.startCount = false;
    this.step = 1;
    this.changeDetectorRef.detectChanges();
  }
  ngOnDestroy(): void {
    clearTimeout(this.countTimer)
  }
  giveCards() {
    setTimeout(() => {
      for (let i = 0; i <= 1; i++) {
        for (let a = 0; a <= 31; a++) {
          this.firstFloor.push('A' + a);
        }
      }
      for (let a = 0; a <= 1; a++) {
        for (let i = 0; i <= 21; i++) {
          this.secondFloor.push('B' + i);
        }
      }
      for (let a = 0; a <= 1; a++) {
        for (let i = 0; i <= 16; i++) {
          this.thirdFloor.push('C' + i);
        }
      }
      for (let a = 0; a <= 1; a++) {
        for (let i = 0; i <= 4; i++) {
          this.fourthFloor.push('D' + i)
        }
      }
      this.allCards.push(...this.firstFloor);
      this.allCards.push(...this.secondFloor);
      this.allCards.push(...this.thirdFloor);
      this.allCards.push(...this.fourthFloor);


      this.mixAllCards();
    }, 1000);
  }

  mixAllCards() {
    while (this.allCards.length > 0) {
      let randomNumber = Math.floor(Math.random() * this.allCards.length);
      let randomCard = this.allCards[randomNumber];
      this.mixedAllCards.push(randomCard);
      this.allCards = this.allCards.filter((i => v => v !== randomCard || --i)(1));
    }
    this.createWalls();
  }
  ngAfterContentChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  createWalls() {
    let firstWall: any[] = this.mixedAllCards.slice(0, 60);
    let secondWall: any[] = this.mixedAllCards.slice(60, 108);
    let thirdWall: any[] = this.mixedAllCards.slice(108, 144);
    let fourthWall: any[] = this.mixedAllCards.slice(144, 150);
    let fifthWall: any[] = this.mixedAllCards.slice(150, 152);


    let firstFloor: HTMLDivElement[] = [];
    let secondFloor: HTMLDivElement[] = [];
    let thirdFloor: HTMLDivElement[] = [];
    let fourthFloor: HTMLDivElement[] = [];
    let fifthFloor: HTMLDivElement[] = [];

    this.initializeFloors(firstWall, firstFloor, 'first');
    this.initializeFloors(secondWall, secondFloor, 'second');
    this.initializeFloors(thirdWall, thirdFloor, 'third');
    this.initializeFloors(fourthWall, fourthFloor, 'fourth', 4);
    this.initializeFloors(fifthWall, fifthFloor, 'fifth', 6);


    this.distribuiteFloors(firstFloor, this.base?.nativeElement, 5);
    this.distribuiteFloors(secondFloor, this.base?.nativeElement, 4);
    this.distribuiteFloors(thirdFloor, this.base?.nativeElement, 3);
    this.distribuiteFloors(fourthFloor, this.base?.nativeElement, 2);
    this.distribuiteFloors(fifthFloor, this.base?.nativeElement, 1);

  }

  initializeFloors(walls: any[], floor: HTMLDivElement[], floorNumber: string, col?: number) {
    for (let w = 0; w < walls.length; w++) {
      let div = document.createElement('div');
      div.classList.add('p-2');
      div.classList.add('border');
      div.classList.add('d-flex');
      div.classList.add('align-items-middle');
      div.classList.add('justify-content-center');
      div.classList.add('tessera');
      div.classList.add(col ? `col-${col}` : 'col-1');
      div.textContent = walls[w];
      div.id = floorNumber + '-' + (w + 1);
      div.addEventListener('click', () => this.checkMove(div));
      floor.push(div);
    }
  }

  distribuiteFloors(floor: HTMLDivElement[], div: any, zIndex: number) {
    let floorContainer = document.createElement('div');
    floorContainer.classList.add('row');
    floorContainer.classList.add('fs-3');
    floorContainer.classList.add('fw-bold');
    floorContainer.classList.add('position-absolute');
    floorContainer.classList.add('p-2');
    switch (zIndex) {
      case (5): {
        floorContainer.classList.add('w-100');
      }
        break;
      case (4): {
        floorContainer.classList.add('width-77');
      }
        break;
      case (3): {
        floorContainer.classList.add('width-60');
      }
        break;
      case (2): {
        floorContainer.classList.add('width-35');
      }
        break;
      case (1): {
        floorContainer.classList.add('width-25');
      }
        break;
      default: {
        return;
      }
    }
    floor.forEach(d => {
      floorContainer.append(d);
      div.append(floorContainer)
    });
    if (1 == zIndex) {
      this.colorCards();
    }
  }

  colorCards() {
    let nephewsArray: HTMLDivElement[] = [];
    for (let child of this.base.nativeElement.children) {
      for (let nephew of child.children) {
        nephewsArray.push(nephew);
      }
    }
    for (let i = 0; i <= nephewsArray.length - 1; i++) {
      for (let j = i + 1; j <= nephewsArray.length - 1; j++) {
        if (nephewsArray[i].textContent == nephewsArray[j].textContent) {
          this.assignBackgroundColor(nephewsArray[i], nephewsArray[j]);
        }
      }
    }
  }

  assignBackgroundColor(firstCard: HTMLDivElement, secondCard: HTMLDivElement) {
    let colors: string[] = ['bg-warning', 'bg-light', 'bg-danger', 'bg-success', 'bg-info', 'bg-secondary', 'bg-primary'];
    firstCard.classList.add('bg-gradient');
    secondCard.classList.add('bg-gradient');

    let randomColor = Math.floor(Math.random() * colors.length - 1);
    if (randomColor < 0) randomColor = 0;
    firstCard.classList.add(colors[randomColor]);
    secondCard.classList.add(colors[randomColor]);
  }

  checkMove(div: HTMLDivElement) {
    let rows = this.checkRows(div);
    let idNumber = Number(div?.id.substring(div?.id?.lastIndexOf('-') + 1));
    let isCardFree: boolean = this.checkIfFree(div, rows, idNumber);
    console.log(isCardFree);
  }


  checkRows(div: HTMLDivElement): number {
    if (div?.id.startsWith('first')) return 5;
    else if (div?.id.startsWith('second')) return 4;
    else if (div?.id.startsWith('third')) return 3;
    else if (div?.id.startsWith('fourth')) return 2;
    else if (div?.id.startsWith('fifth')) return 1;
    else return 0;
  }

  checkIfFree(div: HTMLDivElement, rows: number, idNumber: number): boolean {
    if ((idNumber == 1 || idNumber == 12 || idNumber == 49 || idNumber == 60) && rows == 5) return true;
    else if ((idNumber == 1 || idNumber == 12 || idNumber == 37 || idNumber == 48) && rows == 4) return true;
    else if ((idNumber == 1 || idNumber == 12 || idNumber == 25 || idNumber == 36) && rows == 3) return true;
    else if (rows == 1) return true;
    else if ((idNumber - 12) < 0) {
      //Controllo se nella prima riga ci sono carte a sinistra o a desta
      if (this.checkIfDivIsPresent(document.getElementById(this.translateRow(rows) + String(idNumber - 1))) ||
        this.checkIfDivIsPresent(document.getElementById(this.translateRow(rows) + String(idNumber + 1)))) {
        if (!(document.getElementById(this.translateRow(rows) + String(idNumber - 1))!.textContent!.length > 0)) {
          console.log('left free on first line , row : ' + this.translateRow(rows).substring(0, this.translateRow(rows).lastIndexOf('-')));
          return true;
        } else if (!(document.getElementById(this.translateRow(rows) + String(idNumber + 1))!.textContent!.length > 0)) {
          console.log('right free on first line , row : ' + this.translateRow(rows).substring(0, this.translateRow(rows).lastIndexOf('-')));
          return true;
        } else {
          console.log('both left and right occupied on first line , row : ' + this.translateRow(rows).substring(0, this.translateRow(rows).lastIndexOf('-')));
          return false;
        }
      } else if (!this.checkIfDivIsPresent(document.getElementById(this.translateRow(rows) + String(idNumber - 1))) ||
        !this.checkIfDivIsPresent(document.getElementById(this.translateRow(rows) + String(idNumber + 1)))) {
        console.log('left or right undefined on first line , row : ' + this.translateRow(rows).substring(0, this.translateRow(rows).lastIndexOf('-')));
        return true;
      } else {
        return false;
      }
    } else if (((idNumber + 12) > 60 && rows == 5) || ((idNumber + 12) > 48 && rows == 4) || ((idNumber + 12) > 36 && rows == 3) || ((idNumber + 3) > 6 && rows == 2)) {
      //just to fix return error... to do ...
      console.log('to do ...');
      return true;
    }
    else return false;
  }
  translateRow(rows: number): string {
    if (rows == 5) {
      return 'first-';
    } else if (rows == 4) {
      return 'second-';
    } else if (rows == 3) {
      return 'third-';
    } else if (rows == 2) {
      return 'fourth-';
    } else {
      return 'fifth-'
    }
  }
  checkIfDivIsPresent(div: any) {
    return (undefined != div && null != div);
  }
}
