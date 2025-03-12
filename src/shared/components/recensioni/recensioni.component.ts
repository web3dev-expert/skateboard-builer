import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../../interfaces/interfaces';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { RecensioneService } from '../../../services/recensione.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recensioni',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, NgClass, NgFor, MatDialogClose, NgIf, ReactiveFormsModule],
  templateUrl: './recensioni.component.html',
  styleUrl: './recensioni.component.scss'
})
export class RecensioniComponent implements OnInit {
  user: User | null = null;
  gioco: any = null;
  recensione: any = null;
  validationPoints: number[] = [1, 2, 3, 4, 5];
  recensioni: any;
  recensioneForm: FormGroup = new FormGroup({});
  isRecensioneFormSubmitted: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService, private recensioneService: RecensioneService, private toastr: ToastrService) {
    this.gioco = data;
    this.user = this.authService.getUser();
  }
  ngOnInit(): void {
    this.getRecensioni();
    this.generateRecensioneForm();
  }

  getRecensioni() {
    this.recensioneService.getRecensioneByUserIdAndGiocoId(this.gioco?.id).subscribe((data: any) => { this.recensione = data; });
    this.recensioneService.getRecensioneByGiocoIdPaginated(this.gioco?.id).subscribe((data: any) => { this.recensioni = data; });
  }

  generateRecensioneForm() {
    this.recensioneForm = new FormGroup({
      punteggio: new FormControl('', Validators.required),
      commento: new FormControl('', Validators.required)
    })
  }

  recensisciGioco() {
    this.isRecensioneFormSubmitted = true;
    if (this.recensioneForm.valid) {
      let recensione = {
        giocoId: this.gioco?.id,
        commento: this.recensioneForm.get('commento')?.value,
        punteggio: this.recensioneForm.get('punteggio')?.value
      }
      this.recensioneService.saveRecensione(recensione).subscribe({
        next: () => {
          this.getRecensioni();
        }
      })
    } else {
      this.toastr.error("Completa correttamente il form.")
    }
  }

  checkCommento() {
    return (this.recensioneForm.get('commento')!.invalid || this.recensioneForm.get('commento')!.value.trim() === "")
  }
}
