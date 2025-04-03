import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../interfaces/interfaces';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-memory',
  standalone: true,
  imports: [],
  templateUrl: './memory.component.html',
  styleUrl: './memory.component.scss'
})
export class MemoryComponent implements OnInit {

  @Input() game!: number
  user: User | null = null;

  constructor(private authService: AuthService) { 
    this.user = this.authService.getUser();
  }

  ngOnInit(): void {
  }

}
