import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
rotate(id:string){
  let div = document.querySelector(`#${id}`) as HTMLDivElement;
  div.style.transition='1s';
  div.style.transform='rotateY(180deg)';
}
}
