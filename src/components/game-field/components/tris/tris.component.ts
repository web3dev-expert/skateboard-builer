import { NgIf, NgClass } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../interfaces/interfaces';
import { GamefieldService } from '../../../../services/gamefield.service';

@Component({
  selector: 'app-tris',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './tris.component.html',
  styleUrl: './tris.component.scss'
})
export class TrisComponent implements OnInit, OnDestroy {
  isEnemyMoving: boolean = false;
  usersMoves: number[] = [];
  enemysMoves: number[] = [];
  enemyWins: boolean = false;
  userWins: boolean = false;
  isFull: boolean = false;
  start: string = '';
  cominciata: boolean = false;
  usersMatchesWon: number = 0;
  enemysMatchesWon: number = 0;
  totalMatchesPlayed: number = 0;
  totalSplitMatches: number = 0;
  user: User | null = null;
  @Input() game!: number;
  partite: { userId: number, giocoId: number, esito: string, punteggio: number }[] = [];

  constructor(private authSerice: AuthService, private gamefieldService: GamefieldService) {
    this.user = this.authSerice.getUser();
  }

  ngOnInit(): void {
    let whoStart: number = Math.round(Math.random() * 2);
    if (whoStart <= 1) this.start = 'user';
    else {
      this.start = 'enemy';
      this.enemyMoves();
    }
  }

  position(event: any) {
    if (this.isEnemyMoving) return;
    else if (this.enemyWins) return;
    else if (this.userWins) return;
    else if (!this.cominciata) return;
    else if (this.isFull) return;
    if (event.target.innerHTML == undefined || event.target.innerHTML == null || event.target.innerHTML == '') {
      event.target.append('🟢');

      this.usersMoves.push(Number(event?.target?.id));

      if (this.checkIfTris(this.usersMoves)) {
        this.userWins = true;
        this.usersMatchesWon += 1;
        this.partite[this.partite.length - 1].esito = 'VINTA';
      }
      if (this.userWins) return;
      this.isFull = this.checkIfFull();
      if (this.isFull) {
        this.totalSplitMatches += 1;
        this.partite[this.partite.length - 1].esito = 'PAREGGIATA';
      }
      if (this.isFull) return;
      this.enemyMoves();
    }
  }

  enemyMoves() {
    if (this.enemyWins) return;
    else if (this.userWins) return;
    else if (this.isFull) return;
    else if (!this.cominciata) return;

    this.isEnemyMoving = true;
    setTimeout(() => {
      let div = document.getElementsByClassName('col-4');
      let cleanDiv: any[] = [];
      let enemyTris: number = -1;
      let userTris: number = -1;

      for (let i = 0; i <= div.length - 1; i++) {
        if (!this.includesAll(this.usersMoves, [Number(div[i].id)]) && !this.includesAll(this.enemysMoves, [Number(div[i].id)])) {
          cleanDiv.push(div[i]);
        }
      }
      cleanDiv = cleanDiv.filter(c => c.innerHTML == '' || c.innerHTML == undefined || c.innerHTML == null);
      enemyTris = this.checkTris(this.enemysMoves, this.usersMoves);

      if (enemyTris && enemyTris != -1) {
        div[enemyTris].append('❌');
        this.isEnemyMoving = false;
        this.enemyWins = true;
        this.partite[this.partite.length - 1].esito = 'PERSA';
        this.enemysMatchesWon += 1;
        this.enemysMoves.push(Number(div[enemyTris].id));
        return;
      };

      userTris = this.checkTris(this.usersMoves, this.enemysMoves);
      let randomUserObstacle = Math.random() * 2;

      if (userTris && userTris != -1 && randomUserObstacle > 0.35) {
        div[userTris].append('❌');
        this.isEnemyMoving = false;
        this.enemysMoves.push(Number(div[userTris].id));
        if (this.checkIfTris(this.enemysMoves)) {
          debugger
          this.enemyWins = true;
          this.enemysMatchesWon += 1;
        }
        return;
      };
      let randomIndex: number = Math.round(Math.random() * cleanDiv.length)
      if (cleanDiv[randomIndex == 0 ? 0 : randomIndex == 1 ? 0 : randomIndex - 1]) cleanDiv[randomIndex == 0 ? 0 : randomIndex == 1 ? 0 : randomIndex - 1].append('❌')
      this.enemysMoves.push(Number(cleanDiv[randomIndex == 0 ? 0 : randomIndex == 1 ? 0 : randomIndex - 1].id));
      this.isEnemyMoving = false;
      this.isFull = this.checkIfFull();
      if (this.isFull) {
        this.totalSplitMatches += 1;
        this.partite[this.partite.length - 1].esito = 'PAREGGIATA';
      }
      if (this.isFull) return;
    }, 4000)
  }

  checkTris(array: number[], array1: number[]): number {
    if (this.includesAll(array, [0, 1]) && !this.includesAll(array1, [2])) return 2;
    else if (this.includesAll(array, [0, 2]) && !this.includesAll(array1, [1])) return 1;
    else if (this.includesAll(array, [1, 2]) && !this.includesAll(array1, [0])) return 0;
    else if (this.includesAll(array, [0, 3]) && !this.includesAll(array1, [6])) return 6;
    else if (this.includesAll(array, [0, 4]) && !this.includesAll(array1, [8])) return 8;
    else if (this.includesAll(array, [0, 8]) && !this.includesAll(array1, [4])) return 4;
    else if (this.includesAll(array, [0, 6]) && !this.includesAll(array1, [3])) return 3;
    else if (this.includesAll(array, [1, 4]) && !this.includesAll(array1, [7])) return 7;
    else if (this.includesAll(array, [2, 4]) && !this.includesAll(array1, [6])) return 6;
    else if (this.includesAll(array, [2, 6]) && !this.includesAll(array1, [4])) return 4;
    else if (this.includesAll(array, [2, 5]) && !this.includesAll(array1, [8])) return 8;
    else if (this.includesAll(array, [2, 8]) && !this.includesAll(array1, [5])) return 5;
    else if (this.includesAll(array, [3, 6]) && !this.includesAll(array1, [0])) return 0;
    else if (this.includesAll(array, [3, 4]) && !this.includesAll(array1, [5])) return 5;
    else if (this.includesAll(array, [3, 5]) && !this.includesAll(array1, [4])) return 4;
    else if (this.includesAll(array, [4, 6]) && !this.includesAll(array1, [2])) return 2;
    else if (this.includesAll(array, [4, 7]) && !this.includesAll(array1, [1])) return 1;
    else if (this.includesAll(array, [4, 8]) && !this.includesAll(array1, [0])) return 0;
    else if (this.includesAll(array, [4, 5]) && !this.includesAll(array1, [3])) return 3;
    else if (this.includesAll(array, [6, 7]) && !this.includesAll(array1, [8])) return 8;
    else if (this.includesAll(array, [6, 8]) && !this.includesAll(array1, [7])) return 7;
    else if (this.includesAll(array, [7, 8]) && !this.includesAll(array1, [6])) return 6;
    else if (this.includesAll(array, [7, 1]) && !this.includesAll(array1, [4])) return 4;
    else if (this.includesAll(array, [8, 5]) && !this.includesAll(array1, [2])) return 2;
    return -1;
  }


  checkIfTris(array: number[]): boolean {

    if (this.includesAll(array, [0, 1, 2])) return true;
    else if (this.includesAll(array, [2, 4, 6])) return true;
    else if (this.includesAll(array, [0, 3, 6])) return true;
    else if (this.includesAll(array, [0, 4, 8])) return true;
    else if (this.includesAll(array, [1, 4, 7])) return true;
    else if (this.includesAll(array, [2, 5, 8])) return true;
    else if (this.includesAll(array, [3, 4, 5])) return true;
    else if (this.includesAll(array, [6, 7, 8])) return true;

    return false;
  }


  includesAll = (arr: number[], values: number[]) => values.every((v: number) => arr.includes(v));


  checkIfFull() {
    let div = document.getElementsByClassName('col-4');

    for (let i = 0; i <= div.length - 1; i++) {
      if (div[i].innerHTML != '🟢' && div[i].innerHTML != '❌') return false;
    }

    return true;
  }

  ricomincia() {
    let div = document.getElementsByClassName('col-4');

    for (let i = 0; i <= div.length - 1; i++) {
      div[i].innerHTML = '';
    }
    this.userWins = false;
    this.enemyWins = false;
    this.isFull = false;
    this.usersMoves = [];
    this.enemysMoves = [];
    this.totalMatchesPlayed += 1;
    this.partite.push({ userId: this.user!.id, giocoId: this.game, esito: 'PERSA', punteggio: 0 })
    this.ngOnInit();
  }
  comincia() {
    this.cominciata = true;
    this.totalMatchesPlayed += 1;
    this.partite.push({ userId: this.user!.id, giocoId: this.game, esito: 'PERSA', punteggio: 0 })
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    this.gamefieldService.postPartite(this.partite).subscribe({
      next: (data:any) => {
        console.log(data);
      }
    })
  }
}
