import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../interfaces/interfaces';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-ask-confirm',
  standalone: true,
  imports: [MatDialogClose, MatDialogActions, MatDialogContent, NgClass, NgIf,NgFor],
  templateUrl: './ask-confirm.component.html',
  styleUrl: './ask-confirm.component.scss'
})
export class AskConfirmComponent implements OnInit {

  giocoName: string = '';
  recensione: any = null;
  validationPoints: number[] = [1, 2, 3, 4, 5];
  user!: User;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AskConfirmComponent>, private authService: AuthService) {
    this.user = this.authService.getUser()!;
  }

  ngOnInit(): void {
    this.giocoName = this.data[0];
    this.recensione = this.data[1];
    console.log(this.recensione)
  }


  closeDialog(value?: boolean) {
    this.dialogRef.close(value || false);
  }

}
