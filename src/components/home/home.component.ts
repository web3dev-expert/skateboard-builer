import { NgFor, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
