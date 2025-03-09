import { ChangeDetectorRef, Component, OnInit, Sanitizer } from '@angular/core';
import { GiochiService } from '../../services/giochi.service';
import { throttleTime } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GiocoPreviewComponent } from '../../shared/components/gioco-preview/gioco-preview.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-giochi',
  templateUrl: './giochi.component.html',
  styleUrl: './giochi.component.scss'
})
export class GiochiComponent implements OnInit {
  giochi: any[] = [];
  circles: number[] = [1, 2, 3, 4, 5];
  searchGiocoForm: FormGroup = new FormGroup({});
  points: number[] = [1, 2, 3, 4];
  difficulties: number[] = [1, 2, 3, 4];
  page: number = 0;
  size: number = 1;
  orderBy: string = "id";
  sortOrder: string = "ASC";
  body: { nome: string, difficolta: number, punteggio: number } = {
    nome: this.searchGiocoForm.get('nomeGioco')?.value,
    difficolta: this.searchGiocoForm.get('difficolta')?.value,
    punteggio: this.searchGiocoForm.get('punteggioRecensioniDa')?.value
  };
  isLoading:boolean = false;
  constructor(private giochiService: GiochiService, private matDialog: MatDialog, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initializeGiocoForm();
    this.getGiochi(this.body);
  }

  getGiochi(body: { nome: string, difficolta: number, punteggio: number }, isActive?: boolean) {
    this.giochiService.searchGiochi(body, this.page, this.size, this.orderBy, this.sortOrder, isActive).pipe(throttleTime(1000)).subscribe({
      next: (data: any) => {
        console.log(data.content)
        data?.content?.map((g: any) => { this.giochi.push(g) })
        console.log(this.giochi)
        this.giochi.filter((g: any) => {
          g.image = this.readGiocoImage(g?.image)
        })
        this.isLoading = false;
      }
    })
  }
  readGiocoImage(image: any) {
    if (image.startsWith("data:image/png;base64,")) return image;
    return "data:image/png;base64," + image;
  }
  openGameDialog(gioco: any) {
    const dialogRef = this.matDialog.open(GiocoPreviewComponent, {
      data: gioco,
      width: '50%',
      height: '70%'
    })
    dialogRef.afterClosed().subscribe((data: any) => { })
  }

  initializeGiocoForm() {
    this.searchGiocoForm = new FormGroup({
      nomeGioco: new FormControl(''),
      difficolta: new FormControl(),
      punteggioRecensioniDa: new FormControl('')
    })
  }

  searchGiochi() {
    this.body = {
      nome: this.searchGiocoForm.get('nomeGioco')?.value,
      difficolta: this.searchGiocoForm.get('difficolta')?.value,
      punteggio: this.searchGiocoForm.get('punteggioRecensioniDa')?.value
    };
    this.getGiochi(this.body);
  }
  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight-5 && !this.isLoading) {
      this.page += 1;
      this.isLoading = true;
      this.searchGiochi();
    }
  }
}
