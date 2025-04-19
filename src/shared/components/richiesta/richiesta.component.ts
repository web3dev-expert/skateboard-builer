import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../interfaces/interfaces';
import { ProfileServive } from '../../../services/profile.service';

@Component({
  selector: 'app-richiesta',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatMenuModule, NgClass, NgFor, MatDialogClose, NgIf, ReactiveFormsModule],
  templateUrl: './richiesta.component.html',
  styleUrl: './richiesta.component.scss'
})
export class RichiestaComponent implements OnInit {
  user: User | null = null;
  richiesta: any = null;
  assistenzaForm: FormGroup = new FormGroup({});
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private profiloService: ProfileServive, private toastr: ToastrService,
    private dialog: MatDialog, private dialogRef: MatDialogRef<RichiestaComponent>) {
    this.richiesta = data[0];
    this.user = data[1];
  }

  ngOnInit(): void {
    this.assistenzaForm = new FormGroup({
      oggetto: new FormControl(this.richiesta?.oggetto, Validators.required),
      descrizione: new FormControl(this.richiesta?.descrizione, Validators.required)
    })
  }
}
