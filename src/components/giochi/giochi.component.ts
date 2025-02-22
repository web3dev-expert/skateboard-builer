import { Component, OnInit } from '@angular/core';
import { GiochiService } from '../../services/giochi.service';
import { throttleTime } from 'rxjs';

@Component({
  selector: 'app-giochi',
  templateUrl: './giochi.component.html',
  styleUrl: './giochi.component.scss'
})
export class GiochiComponent implements OnInit {
  giochi: any[] = [];

  constructor(private giochiService: GiochiService) { }

  ngOnInit(): void {
  this.getGiochi();
  }

  getGiochi() {
    this.giochiService.getGiochi().pipe(throttleTime(1000)).subscribe({
      next: (data: any) => {
        this.giochi = data;
      }
    })
  }

}
