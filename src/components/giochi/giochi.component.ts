import { ChangeDetectorRef, Component, OnInit, Sanitizer } from '@angular/core';
import { GiochiService } from '../../services/giochi.service';
import { throttleTime } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GiocoPreviewComponent } from '../../shared/components/gioco-preview/gioco-preview.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { RecensioniComponent } from '../../shared/components/recensioni/recensioni.component';

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
  validationPoints: number[] = [1, 2, 3, 4, 5];
  page: number = 0;
  size: number = 2;
  orderBy: string = "id";
  sortOrder: string = "ASC";
  body: { nome: string, difficolta: number, punteggio: number } = {
    nome: this.searchGiocoForm.get('nomeGioco')?.value,
    difficolta: this.searchGiocoForm.get('difficolta')?.value,
    punteggio: this.searchGiocoForm.get('punteggioRecensioniDa')?.value
  };
  isLoading: boolean = false;
  maxPages: number = 1;
  sizes:number[]=[2,5,10]
  constructor(private giochiService: GiochiService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeGiocoForm();
    this.getGiochi(false,this.body);
  }

  getGiochi(origin:boolean,body: { nome: string, difficolta: number, punteggio: number }, isActive?: boolean) {
    this.searchGiocoForm.get('size')?.value!=''&&
    this.searchGiocoForm.get('size')?.value!=undefined&&
    this.searchGiocoForm.get('size')?.value!=null?
    this.size = this.searchGiocoForm.get('size')?.value:'';
    this.searchGiocoForm.get('orderBy')?.value!=''&&
    this.searchGiocoForm.get('orderBy')?.value!=undefined&&
    this.searchGiocoForm.get('orderBy')?.value!=null?
    this.orderBy = this.searchGiocoForm.get('orderBy')?.value:'';
    this.searchGiocoForm.get('sortOrder')?.value!=''&&
    this.searchGiocoForm.get('sortOrder')?.value!=undefined&&
    this.searchGiocoForm.get('sortOrder')?.value!=null?
    this.sortOrder = this.searchGiocoForm.get('sortOrder')?.value:''

    this.giochiService.searchGiochi(body, this.page, this.size, this.orderBy, this.sortOrder, true).pipe(throttleTime(1000)).subscribe({
      next: (data: any) => {
        if(!origin) data?.content?.map((g: any) => { this.giochi.push(g) })
        else this.giochi=data?.content
        
          this.giochi.filter((g: any) => {
          g.image = this.readGiocoImage(g?.image)
        })
        this.maxPages = data.totalPages;
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
      punteggioRecensioniDa: new FormControl(''),
      size: new FormControl(''),
      orderBy: new FormControl('id'),
      sortOrder: new FormControl('ASC')
    })
  }

  searchGiochi(from?:string) {
    this.body = {
      nome: this.searchGiocoForm.get('nomeGioco')?.value,
      difficolta: this.searchGiocoForm.get('difficolta')?.value,
      punteggio: this.searchGiocoForm.get('punteggioRecensioniDa')?.value
    };
    let origin :boolean = false;
    if(from) {origin = true;this.page!=0?this.page=0:'';};
    this.getGiochi(origin,this.body);
  }
  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 5 && !this.isLoading) {
      this.page += 1;
      if (this.page < this.maxPages) {
        this.isLoading = true;
        setTimeout(() => {
          this.searchGiochi();
        }, 1000)
      }
    }
  }
  rateGame(gioco:any){
    const dialogRef = this.matDialog.open(RecensioniComponent,{data:gioco,width:'60%',height:'70%'})
    dialogRef.afterClosed().subscribe((data:any)=>{})
  }
}
