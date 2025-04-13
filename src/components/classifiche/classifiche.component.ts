import { Component, Input, OnInit } from '@angular/core';
import { ClassificheService } from '../../services/classifiche.service';
import { MatDialog } from '@angular/material/dialog';
import { ShowClassificaComponent } from '../../shared/components/show-classifica/show-classifica.component';

@Component({
  selector: 'app-classifiche',
  templateUrl: './classifiche.component.html',
  styleUrl: './classifiche.component.scss'
})
export class ClassificheComponent implements OnInit {
  @Input() classificaId: number = 0;
  classifica: any;
  isLoading: boolean = false;
  classifiche: any = null;
  constructor(private classificheService: ClassificheService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    if (this.classificaId != 0) {
      this.classificheService.getById(this.classificaId).subscribe({
        next: (data: any) => {
          if (data) this.classifica = data;
            this.classifica = data;
            this.openDialog(this.classifica);
        }
      })
    }
      this.getClassifiche();
  }

  getClassifiche() {
    this.classificheService.getAll().subscribe({
      next: (data: any) => {
        this.classifiche = data;
      }
    })
  }

  openDialog(c: any) {
    this.classifica = c;
    const dialogRef = this.matDialog.open(ShowClassificaComponent, { data: this.classifica })
    dialogRef.afterClosed().subscribe((data: any) => { });
  }
}
