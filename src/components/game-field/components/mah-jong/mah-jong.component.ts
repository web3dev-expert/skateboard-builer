import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GamefieldService } from '../../../../services/gamefield.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../interfaces/interfaces';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-mah-jong',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule, NgClass, MatTooltipModule],
  templateUrl: './mah-jong.component.html',
  styleUrl: './mah-jong.component.scss'
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
  }

  mixAllCards() {
    while (this.allCards.length > 0) {
      let randomNumber = Math.floor(Math.random() * this.allCards.length);
      let randomCard = this.allCards[randomNumber];
      this.mixedAllCards.push(randomCard);
      this.allCards = this.allCards.filter((i => v => v !== randomCard || --i)(1));
    }
    console.log(this.mixedAllCards)
    this.createWalls();
  }
  ngAfterContentChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  createWalls() {
    let divs: any[] = []
    let firstWall:any[] = []
    let secondWall:any[] = []
    let thirdWall:any[] = []
    let fourthWall:any[] = []
    for (let i = 0; i <= 3; i++) {
      let div = document.createElement('div') as HTMLDivElement;

      switch (i) {
        case 0: {
          firstWall = this.mixedAllCards.slice(0, 62);
          break;
        }
        case 1: {
          secondWall = this.mixedAllCards.slice(62, 104);
          break;
        }
        case 2: {
          thirdWall = this.mixedAllCards.slice(104, 136);
          break;
        }
        case 3: {
          fourthWall = this.mixedAllCards.slice(136, 152);
          break;
        }
        default: {
          break;
        }
      }
        console.log(firstWall,secondWall,thirdWall,fourthWall);
    }
  }
}
