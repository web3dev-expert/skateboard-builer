import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-giochi',
  templateUrl: './giochi.component.html',
  styleUrl: './giochi.component.scss'
})
export class GiochiComponent implements OnInit {
  giochi: any[] = [];
  giocoForm!: FormGroup;
  ngOnInit(): void {
    fetch('http://localhost:3031/auth/gioco').then((response: any) => {
      if (response.ok) return response.json();
      else throw new Error("Promis aborted.")
    }).then((res: any) => {
      if (res) {
       this.giochi=res;
      }
    }).catch((error: any) => {
      console.error(error.Error)
    })
  }

}
