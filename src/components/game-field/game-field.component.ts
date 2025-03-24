import { NgClass, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-field',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './game-field.component.html',
  styleUrl: './game-field.component.scss'
})
export class GameFieldComponent implements OnInit, OnDestroy {
  game: number = 0;
  isEnemyMoving: boolean = false;
  usersMoves: number[] = [];
  enemysMoves: number[] = [];
  enemyWins: boolean = false;
  userWins: boolean = false;
  isFull: boolean = false;
  start: string = '';
  cominciata: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(
      params => {
        this.game = JSON.parse(params['gioco']);
      })
    if (this.game == undefined || this.game == 0 || this.game == null) {
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {
    let whoStart: number = Math.round(Math.random() * 2);
    if (whoStart == 1) this.start = 'user';
    else {
      this.start = 'enemy';
      this.enemyMoves();
    }
    localStorage.setItem('location', `game-field`);
    localStorage.setItem('game', String(this.game));
  }

  ngOnDestroy(): void {
    localStorage.removeItem('game');
  }

  position(event: any) {
    if (this.isEnemyMoving) return;
    else if (this.enemyWins) return;
    else if (this.userWins) return;
    else if(!this.cominciata) return;
    if (event.target.innerHTML == undefined || event.target.innerHTML == null || event.target.innerHTML == '') {
      event.target.append('🟢');

      if (this.checkIfUserTris()) this.userWins = true;
      if (this.userWins) return;
      this.isFull = this.checkIfFull();
      if (this.isFull) return;
      this.enemyMoves();
    }
  }

  enemyMoves() {
    if (this.enemyWins) return;
    else if (this.userWins) return;
    else if (this.isFull) return;
    else if(!this.cominciata) return;

    var alreadyAdded: boolean = false;
    this.isEnemyMoving = true;
    setTimeout(() => {
      let div = document.getElementsByClassName('col-4');
      let cleanDiv = [];
      let enemyTris: number = -1;
      let userTris: number = -1;
      for (let i = 0; i <= div.length - 1; i++) {
        if (div[i].innerHTML != '🟢' && div[i].innerHTML != '❌') cleanDiv.push(div[i]);
        else {
          if (div[i].innerHTML == '🟢') {
            this.usersMoves.map(el => {
              if (el == i) {
                alreadyAdded = true;
              }
            })
            if (!alreadyAdded) this.usersMoves.push(i);
            alreadyAdded = false;
          } else {
            this.enemysMoves.map(el => {
              if (el == i) {
                alreadyAdded = true;
              }
            })
            if (!alreadyAdded) this.enemysMoves.push(i);
            alreadyAdded = false;
          }
        }
      }

      enemyTris = this.checkEnemyTris();

      if (enemyTris && enemyTris != -1) { div[enemyTris].append('❌'); this.isEnemyMoving = false; this.enemyWins = true; return; };
      userTris = this.checkUserTris();
      let randomUserObstacle = Math.random() * 2;
      if (userTris && userTris != -1 && randomUserObstacle > 0.35) { div[userTris].append('❌'); this.isEnemyMoving = false; return; };
      let randomIndex: number = Math.round(Math.random() * cleanDiv.length)

      if (cleanDiv[randomIndex == 0 ? 0 : randomIndex == 1 ? 0 : randomIndex - 1]) cleanDiv[randomIndex == 0 ? 0 : randomIndex == 1 ? 0 : randomIndex - 1].append('❌')
      this.isEnemyMoving = false;
      this.isFull = this.checkIfFull();
      if (this.isFull) return;
    }, 4000)
  }

  checkEnemyTris(): number {

    if (this.includesAll(this.enemysMoves, [0, 1]) && !this.includesAll(this.usersMoves, [2])) return 2;
    else if (this.includesAll(this.enemysMoves, [0, 2]) && !this.includesAll(this.usersMoves, [1])) return 1;
    else if (this.includesAll(this.enemysMoves, [1, 2]) && !this.includesAll(this.usersMoves, [0])) return 0;
    else if (this.includesAll(this.enemysMoves, [0, 3]) && !this.includesAll(this.usersMoves, [6])) return 6;
    else if (this.includesAll(this.enemysMoves, [0, 4]) && !this.includesAll(this.usersMoves, [8])) return 8;
    else if (this.includesAll(this.enemysMoves, [0, 8]) && !this.includesAll(this.usersMoves, [4])) return 4;
    else if (this.includesAll(this.enemysMoves, [0, 6]) && !this.includesAll(this.usersMoves, [3])) return 3;
    else if (this.includesAll(this.enemysMoves, [1, 4]) && !this.includesAll(this.usersMoves, [7])) return 7;
    else if (this.includesAll(this.enemysMoves, [2, 4]) && !this.includesAll(this.usersMoves, [6])) return 6;
    else if (this.includesAll(this.enemysMoves, [2, 6]) && !this.includesAll(this.usersMoves, [4])) return 4;
    else if (this.includesAll(this.enemysMoves, [2, 5]) && !this.includesAll(this.usersMoves, [8])) return 8;
    else if (this.includesAll(this.enemysMoves, [2, 8]) && !this.includesAll(this.usersMoves, [5])) return 5;
    else if (this.includesAll(this.enemysMoves, [3, 6]) && !this.includesAll(this.usersMoves, [0])) return 0;
    else if (this.includesAll(this.enemysMoves, [3, 4]) && !this.includesAll(this.usersMoves, [5])) return 5;
    else if (this.includesAll(this.enemysMoves, [3, 5]) && !this.includesAll(this.usersMoves, [4])) return 4;
    else if (this.includesAll(this.enemysMoves, [4, 6]) && !this.includesAll(this.usersMoves, [2])) return 2;
    else if (this.includesAll(this.enemysMoves, [4, 7]) && !this.includesAll(this.usersMoves, [1])) return 1;
    else if (this.includesAll(this.enemysMoves, [4, 8]) && !this.includesAll(this.usersMoves, [0])) return 0;
    else if (this.includesAll(this.enemysMoves, [4, 5]) && !this.includesAll(this.usersMoves, [3])) return 3;
    else if (this.includesAll(this.enemysMoves, [5, 7]) && !this.includesAll(this.usersMoves, [2])) return 2;
    else if (this.includesAll(this.enemysMoves, [6, 7]) && !this.includesAll(this.usersMoves, [8])) return 8;
    else if (this.includesAll(this.enemysMoves, [6, 8]) && !this.includesAll(this.usersMoves, [7])) return 7;
    else if (this.includesAll(this.enemysMoves, [7, 8]) && !this.includesAll(this.usersMoves, [6])) return 6;
    else if (this.includesAll(this.enemysMoves, [7, 1]) && !this.includesAll(this.usersMoves, [4])) return 4;
    else if (this.includesAll(this.enemysMoves, [8, 5]) && !this.includesAll(this.usersMoves, [2])) return 2;
    return -1;
  }

  checkUserTris(): number {

    if (this.includesAll(this.usersMoves, [0, 1]) && !this.includesAll(this.enemysMoves, [2])) return 2;
    else if (this.includesAll(this.usersMoves, [0, 2]) && !this.includesAll(this.enemysMoves, [1])) return 1;
    else if (this.includesAll(this.usersMoves, [1, 2]) && !this.includesAll(this.enemysMoves, [0])) return 0;
    else if (this.includesAll(this.usersMoves, [0, 3]) && !this.includesAll(this.enemysMoves, [6])) return 6;
    else if (this.includesAll(this.usersMoves, [0, 4]) && !this.includesAll(this.enemysMoves, [8])) return 8;
    else if (this.includesAll(this.usersMoves, [0, 8]) && !this.includesAll(this.enemysMoves, [4])) return 4;
    else if (this.includesAll(this.usersMoves, [0, 6]) && !this.includesAll(this.enemysMoves, [3])) return 3;
    else if (this.includesAll(this.usersMoves, [1, 4]) && !this.includesAll(this.enemysMoves, [7])) return 7;
    else if (this.includesAll(this.usersMoves, [2, 4]) && !this.includesAll(this.enemysMoves, [6])) return 6;
    else if (this.includesAll(this.usersMoves, [2, 6]) && !this.includesAll(this.enemysMoves, [4])) return 4;
    else if (this.includesAll(this.usersMoves, [2, 5]) && !this.includesAll(this.enemysMoves, [8])) return 8;
    else if (this.includesAll(this.usersMoves, [2, 8]) && !this.includesAll(this.enemysMoves, [5])) return 5;
    else if (this.includesAll(this.usersMoves, [3, 6]) && !this.includesAll(this.enemysMoves, [0])) return 0;
    else if (this.includesAll(this.usersMoves, [3, 4]) && !this.includesAll(this.enemysMoves, [5])) return 5;
    else if (this.includesAll(this.usersMoves, [3, 5]) && !this.includesAll(this.enemysMoves, [4])) return 4;
    else if (this.includesAll(this.usersMoves, [4, 6]) && !this.includesAll(this.enemysMoves, [2])) return 2;
    else if (this.includesAll(this.usersMoves, [4, 7]) && !this.includesAll(this.enemysMoves, [1])) return 1;
    else if (this.includesAll(this.usersMoves, [4, 8]) && !this.includesAll(this.enemysMoves, [0])) return 0;
    else if (this.includesAll(this.usersMoves, [4, 5]) && !this.includesAll(this.enemysMoves, [3])) return 3;
    else if (this.includesAll(this.usersMoves, [5, 7]) && !this.includesAll(this.enemysMoves, [2])) return 2;
    else if (this.includesAll(this.usersMoves, [6, 7]) && !this.includesAll(this.enemysMoves, [8])) return 8;
    else if (this.includesAll(this.usersMoves, [6, 8]) && !this.includesAll(this.enemysMoves, [7])) return 7;
    else if (this.includesAll(this.usersMoves, [7, 8]) && !this.includesAll(this.enemysMoves, [6])) return 6;
    else if (this.includesAll(this.usersMoves, [7, 1]) && !this.includesAll(this.enemysMoves, [4])) return 4;
    else if (this.includesAll(this.usersMoves, [8, 5]) && !this.includesAll(this.enemysMoves, [2])) return 2;
    return -1;
  }

  checkIfUserTris(): boolean {

    let div = document.getElementsByClassName('col-4');
    let cleanDiv = [];
    let alreadyAdded: boolean = false;
    for (let i = 0; i <= div.length - 1; i++) {
      if (div[i].innerHTML != '🟢' && div[i].innerHTML != '❌') cleanDiv.push(div[i]);
      else {
        if (div[i].innerHTML == '🟢') {
          this.usersMoves.map(el => {
            if (el == i) {
              alreadyAdded = true;
            }
          })
          if (!alreadyAdded) this.usersMoves.push(i);
          alreadyAdded = false;
        } else {
          this.enemysMoves.map(el => {
            if (el == i) {
              alreadyAdded = true;
            }
          })
          if (!alreadyAdded) this.enemysMoves.push(i);
          alreadyAdded = false;
        }
      }
    }

    if (this.includesAll(this.usersMoves, [0, 1, 2])) return true;
    else if (this.includesAll(this.usersMoves, [2, 4, 6])) return true;
    else if (this.includesAll(this.usersMoves, [0, 3, 6])) return true;
    else if (this.includesAll(this.usersMoves, [0, 4, 8])) return true;
    else if (this.includesAll(this.usersMoves, [1, 4, 7])) return true;
    else if (this.includesAll(this.usersMoves, [2, 5, 8])) return true;
    else if (this.includesAll(this.usersMoves, [3, 4, 5])) return true;
    else if (this.includesAll(this.usersMoves, [6, 7, 8])) return true;

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
    this.ngOnInit();
  }
  comincia() {
    this.cominciata = true;
    this.ngOnInit();
  }
}


