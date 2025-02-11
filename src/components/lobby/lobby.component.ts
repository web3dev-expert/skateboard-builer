import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/interfaces';
import { NgClass, NgIf } from '@angular/common';
import { ModeService } from '../../services/mode.service';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss'
})
export class LobbyComponent implements OnInit {

  user: User | null;
  toggle: boolean = false;
  mode: string = 'light';
  constructor(private authService: AuthService, private modeService: ModeService) {
    this.user = this.authService.getUser()
    console.log(this.user)
    this.modeService.mode.subscribe((data: string) => {
      this.mode = data;
    })
  }

  ngOnInit(): void {
    localStorage.setItem('location', 'lobby')
  }
}
