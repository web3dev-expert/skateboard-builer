import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavComponent } from '../components/nav/nav.component';
import { FootComponent } from '../components/foot/foot.component';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ModeService } from '../services/mode.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FootComponent, NgIf, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'game-front';
  showGoTop: boolean = false;
  mode: string = 'light';

  constructor(private modeService: ModeService, private authService: AuthService, private router: Router) {
    this.modeService.mode.subscribe((data: string) => {
      this.mode = data;
    })
  }

  @HostListener('window:scroll', ['$event']) private onScroll(): void {
    if (window.scrollY > 500) {
      this.showGoTop = true;
    } else {
      this.showGoTop = false;
    }
  };

  ngOnInit(): void {
    let accessToken: string = localStorage.getItem('accessToken')!
    let location: string = localStorage.getItem('location')!

    if (accessToken) {
      this.authService.verifyAccessToken(accessToken).subscribe({
        next: (user: any) => {
          if (user) {
            this.authService.setUser(user);
            this.authService.authenticateUser(true);
            this.authService.setToken(accessToken);
            this.router.navigate([`/${location || 'home'}`]);
          }
        }
      })
    }
    else{
      localStorage.clear()
    }
  }

  goUp() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
