import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  id:number = 0;
  constructor(private router:Router){}
  ngOnInit(): void {
    const currentState = this.router.lastSuccessfulNavigation;
    console.log(currentState?.extras)
    localStorage.setItem('location', 'lobby/profile')
  }
}
