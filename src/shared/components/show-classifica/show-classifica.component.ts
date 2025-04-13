import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { ClassificheService } from '../../../services/classifiche.service';

@Component({
  selector: 'app-show-classifica',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions],
  templateUrl: './show-classifica.component.html',
  styleUrl: './show-classifica.component.scss'
})
export class ShowClassificaComponent implements OnInit{

  classifica: any = null;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private classificheService: ClassificheService, private matDialogRef : MatDialogRef<ShowClassificaComponent>) {} 

  ngOnInit(): void {
    this.classifica = this.data;
    this.classificheService.getByGiocoId(this.classifica?.gioco?.id).subscribe({
      next:(data:any)=>{
        console.log(data.users);
      }
    })
  }

}
