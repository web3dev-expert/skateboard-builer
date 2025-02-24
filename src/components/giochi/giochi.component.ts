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
  circles:number[] = [1,2,3,4,5];
  constructor(private giochiService: GiochiService) { }

  ngOnInit(): void {
    this.getGiochi();
  }

  getGiochi() {
    this.giochiService.getGiochi().pipe(throttleTime(1000)).subscribe({
      next: (data: any) => {
        this.giochi = data;
        this.giochi.filter((g: any) => {
          g.image = this.readGiocoImage(g?.image)
        })
        console.log(this.giochi)
      }
    })
  }
  readGiocoImage(image: any) {
    return "data:image/png;base64," + image;
  }
}
