import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-gioco-preview',
  standalone: true,
  imports: [MatDialogActions,MatDialogContent,MatDialogTitle,MatDialogClose],
  templateUrl: './gioco-preview.component.html',
  styleUrl: './gioco-preview.component.scss'
})
export class GiocoPreviewComponent implements OnInit{
  user: User | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authService:AuthService){}
  
  ngOnInit(): void {
    this.user = this.authService.getUser();
    console.log(this.user)
  }

}
