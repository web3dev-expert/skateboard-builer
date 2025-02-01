import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss'
})
export class LobbyComponent implements OnInit{

  ngOnInit(): void {
    localStorage.setItem('location','lobby')
  }
}
