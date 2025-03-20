import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  id: number = 0;
  visitedUser!: User | null;
  user!: User;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        if (params && params['user']) {
          this.visitedUser = JSON.parse(params['user']);
          if (this.visitedUser != null && this.visitedUser != undefined) localStorage.setItem('visitedUser', JSON.stringify(this.visitedUser));
          else this.router.navigate(['/lobby']);
        } else {
          if (!localStorage.getItem('visitedUser')) this.router.navigate(['/lobby']);
          else this.visitedUser = JSON.parse(localStorage.getItem('visitedUser')!);
        }
      }
    )
    localStorage.setItem('location', 'lobby/profile')
  }
}
