import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/interfaces';
import { ProfileServive } from '../../services/profile.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { GamefieldService } from '../../services/gamefield.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  id: number = 0;
  visitedUser!: User | null;
  user!: User;
  recePage: number = 0;
  receSize: number = 2;
  receOrderBy: string = 'punteggio';
  receSortOrder: string = 'ASC';
  recensioni: any = null;
  giochiPage: number = 0;
  giochiSize: number = 2;
  giochiOrderBy: string = 'id';
  giochiSortOrder: string = 'ASC';
  giochi: any = null;
  validationPoints: number[] = [1, 2, 3, 4, 5]
  gioco: any = null;
  ordinaArray: { label: string, values: string[] }[] = [
    { label: 'Punteggio migliore', values: ['punteggio', 'DESC'] },
    { label: 'Punteggio peggiore', values: ['punteggio', 'ASC'] },
    { label: 'Più recente', values: ['createdAt', 'DESC'] },
    { label: 'Meno recente', values: ['createdAt', 'ASC'] }];
  sizes: number[] = [2, 5, 10];
  windowWidth:number = 0;
  menuVoices : string[] = ['Profilo' , 'Recensioni', 'Giochi', 'Trofei', 'Classifiche','Partite'];
  section:string = 'Profilo';
  constructor(private route: ActivatedRoute, private router: Router, private profiloService: ProfileServive, private gamefieldService : GamefieldService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        if (params && params['user']) {
          this.visitedUser = JSON.parse(params['user']);
          this.getAllDatas();
          if (this.visitedUser != null && this.visitedUser != undefined) localStorage.setItem('visitedUser', JSON.stringify(this.visitedUser));
          else this.router.navigate(['/lobby']);
        } else {
          if (!localStorage.getItem('visitedUser')) this.router.navigate(['/lobby']);
          else this.visitedUser = JSON.parse(localStorage.getItem('visitedUser')!); this.getAllDatas();
        }
        console.log(this.visitedUser)
      }
    )
    localStorage.setItem('location', 'lobby/profile')
  }

  getAllDatas() {
    this.getRecensioni();
    this.getGiochi();
    this.onResize();
  }

  getRecensioni() {
    this.profiloService.getRecensioniByUserId(this.visitedUser!.id, this.recePage, this.receSize, this.receOrderBy, this.receSortOrder).subscribe({
      next: (reces: any) => {
        this.recensioni = reces;
      }
    })
  }
  getGiochi() {
    this.profiloService.getGiochiByUserId(this.visitedUser!.id, this.giochiPage, this.giochiSize, this.giochiOrderBy, this.giochiSortOrder).subscribe({
      next: (games: any) => {
        this.giochi = games;
      }
    })
  }
  getPartite() {
    this.gamefieldService.getPartitaByUser(this.user?.id).subscribe({
      next: (partite: any) => {
        console.log(partite)
      }
    })
  }
  toNumber(element:string){
    return Number(element);
  }

  @HostListener('window:resize',['$event'])
  onResize(){
    this.windowWidth = window.innerWidth;
  }
}
