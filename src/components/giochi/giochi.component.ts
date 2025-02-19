import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-giochi',
  templateUrl: './giochi.component.html',
  styleUrl: './giochi.component.scss'
})
export class GiochiComponent implements OnInit{
giochi:any [] = [];
giocoForm!: FormGroup;
ngOnInit(): void {
  
}

}
