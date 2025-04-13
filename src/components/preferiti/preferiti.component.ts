import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-preferiti',
  standalone: true,
  imports: [],
  templateUrl: './preferiti.component.html',
  styleUrl: './preferiti.component.scss'
})
export class PreferitiComponent implements OnInit {
  user: User | null = null;
  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        if (params['user']) {
          this.authService.getUserById(params['user']).subscribe({
            next: (data: any) => {
              this.user = data;
            }
          })
        }
      }
    )
    localStorage.setItem('location', 'lobby/preferiti')
  }

}
