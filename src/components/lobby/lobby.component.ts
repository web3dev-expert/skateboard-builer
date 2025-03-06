import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/interfaces';
import { ModeService } from '../../services/mode.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss'
})
export class LobbyComponent implements OnInit {

  user: User | null;
  toggle: boolean = false;
  mode: string = 'light';
  location: string = 'giochi';
  showMenu: boolean = false;
  constructor(private authService: AuthService, private modeService: ModeService) {
    this.user = this.authService.getUser()
    this.modeService.mode.subscribe((data: string) => {
      this.mode = data;
    })
  }

  ngOnInit(): void {
    localStorage.setItem('location', 'lobby')
  }
}
