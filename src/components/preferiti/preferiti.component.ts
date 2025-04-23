import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../../interfaces/interfaces';
import { AuthService } from '../../services/auth.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { PreferitiServive } from '../../services/preferiti.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-preferiti',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, MatTooltipModule, RouterLink],
  templateUrl: './preferiti.component.html',
  styleUrl: './preferiti.component.scss'
})
export class PreferitiComponent implements OnInit, OnDestroy {
  user: User | null = null;
  visitedUser: User | null = null;
  preferiti: any = null;
  constructor(private route: ActivatedRoute, private authService: AuthService, private preferitiService: PreferitiServive,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.route.queryParams.subscribe(
      params => {
        if (params['user']) {
          this.authService.getUserById(params['user']).subscribe({
            next: (data: any) => {
              if (data) {
                this.visitedUser = data;
                localStorage.setItem('visitedUser', JSON.stringify(this.visitedUser));
                this.getPreferiti();

              } else {
                if (localStorage.getItem('visitedUser')) {
                  this.visitedUser = JSON.parse(localStorage.getItem('visitedUser')!);
                  this.getPreferiti();
                }
              }
            }
          })
        }
      }
    )
    if (localStorage.getItem('visitedUser')) {
      this.visitedUser = JSON.parse(localStorage.getItem('visitedUser')!);
      this.getPreferiti();
    }
    localStorage.setItem('location', 'lobby/preferiti')
  }

  ngOnDestroy(): void {
    localStorage.removeItem('visitedUser');
  }

  getPreferiti() {
    this.preferitiService.getPreferiti(this.visitedUser!.id).subscribe({
      next: (data: any) => {
        this.preferiti = data;
      }
    })
  }

  deletePreferito(preferitoId: number) {
    this.preferitiService.deletePreferito(preferitoId).subscribe({
      next: (data: any) => {
        if (data) {
          this.toastr.success("Gioco rimosso dai preferiti.");
          this.getPreferiti();
        } else {
          this.toastr.error("Gioco non rimosso. Riprova o contatta l'assistenza.");
        }
      }
    })
  }
}
