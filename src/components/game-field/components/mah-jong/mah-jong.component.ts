import { Component, Input, OnInit } from '@angular/core';
import { GamefieldService } from '../../../../services/gamefield.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../interfaces/interfaces';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { GiochiService } from '../../../../services/giochi.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-mah-jong',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule, NgClass, MatTooltipModule],
  templateUrl: './mah-jong.component.html',
  styleUrl: './mah-jong.component.scss'
})
export class MahJongComponent implements OnInit {
  @Input() game: number = 0;
  user: User | null = null;
  step: number = 1;
  gioco: any = null;
  difficoltaPartitaForm: FormGroup = new FormGroup({});
  difficoltaAvailables: number[] = [1, 2, 3, 4];
  constructor(private gameFieldService: GamefieldService, private authService: AuthService) { }

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
}
