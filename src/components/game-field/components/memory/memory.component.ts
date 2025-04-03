import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../interfaces/interfaces';
import { AuthService } from '../../../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-memory',
  standalone: true,
  imports: [NgIf],
  templateUrl: './memory.component.html',
  styleUrl: './memory.component.scss'
})
export class MemoryComponent implements OnInit {

  @Input() game!: number;
  user: User | null = null;
  step: number = 0;
  difficolta: string = '';
  constructor(private authService: AuthService) {
    this.user = this.authService.getUser();
  }

  ngOnInit(): void {
    this.step = 1
  }


  go(value?: string) {
    this.difficolta = value || this.difficolta;
    this.step++
  }

}
