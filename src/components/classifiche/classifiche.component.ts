import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-classifiche',
  templateUrl: './classifiche.component.html',
  styleUrl: './classifiche.component.scss'
})
export class ClassificheComponent implements OnInit{
@Input() classificaId : number = 0;

ngOnInit(): void {
  if(this.classificaId!=0){
    console.log('diverso!')
  }
}
}
