import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../interfaces/interfaces';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProfileServive } from '../../../../services/profile.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { RichiestaComponent } from '../../../../shared/components/richiesta/richiesta.component';

@Component({
  selector: 'app-impostazioni',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatTooltipModule, NgFor],
  templateUrl: './impostazioni.component.html',
  styleUrl: './impostazioni.component.scss'
})
export class ImpostazioniComponent implements OnInit {
  @Input() section: string = '';
  @Input() user: User | null = null;
  assistenzaForm: FormGroup = new FormGroup({});
  richieste: any = null;
  constructor(private toastr: ToastrService, private profileService: ProfileServive, private datePipe: DatePipe, private matDialog: MatDialog) { }
  ngOnInit(): void {
    this.assistenzaForm = new FormGroup({
      oggetto: new FormControl('', Validators.required),
      descrizione: new FormControl('', Validators.required)
    })
    this.getRichieste();
  }

  inviaRichiesta() {
    if (this.assistenzaForm.valid) {
      let richiesta: any = {
        userId: this.user!.id,
        oggetto: this.assistenzaForm.get('oggetto')?.value,
        descrizione: this.assistenzaForm.get('descrizione')?.value
      }
      this.profileService.postRichiestaAssistenza(richiesta).subscribe({
        next: (data: any) => {
          this.toastr.success("Richiesta inviata.");
          this.assistenzaForm.reset();
          this.getRichieste();
        }
      })
    } else {
      this.toastr.show('Inserisci i campi richiesti.')
    }
  }

  getRichieste() {
    this.profileService.getRichiesteByUserId(this.user!.id).subscribe({
      next: (data: any) => {
        this.richieste = data;
      }
    })
  }

  format(date: string) {
    return this.datePipe.transform(date, 'dd/MM/yyyy')
  }

  modifyRichiesta(richiesta: any) {
    const dialogRef = this.matDialog.open(RichiestaComponent, { data: [richiesta, this.user] })
    dialogRef.afterClosed().subscribe({next:(data:any)=>{}});
  }
}
