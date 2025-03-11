import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../../interfaces/interfaces';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { RecensioneService } from '../../../services/recensione.service';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-recensioni',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, NgClass, NgFor, MatDialogClose, NgIf],
  templateUrl: './recensioni.component.html',
  styleUrl: './recensioni.component.scss'
})
export class RecensioniComponent implements OnInit {
  user: User | null = null;
  gioco: any = null;
  recensione: any = null;
  validationPoints: number[] = [1, 2, 3, 4, 5];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService, private recensioneService: RecensioneService) {
    this.gioco = data;
    this.user = this.authService.getUser();
  }
  ngOnInit(): void {
    this.getRecensione()
  }

  getRecensione() {
    this.recensioneService.getRecensioneByUserIdAndGiocoId(this.gioco?.id).subscribe((data: any) => { this.recensione = data; });
  }
}
