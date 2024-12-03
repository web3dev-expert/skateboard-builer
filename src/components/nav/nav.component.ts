import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { ModeService } from '../../services/mode.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgIf, NgClass, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  isAuthenticatedUser: boolean = false;
  mode: string = 'light';
  constructor(private authService: AuthService, private router: Router, private modeService: ModeService) {
    this.authService.isAuthenticatedUser.subscribe((bool: boolean) => {
      this.isAuthenticatedUser = bool;
    })
    this.modeService.mode.subscribe((mood: string) => {
      this.mode = mood;
    })
  }
  logout() {
    this.authService.authenticateUser(false);
    localStorage.clear();
  }
  updateMode(value: string) {
    this.modeService.updateMode(value);
  }
}
