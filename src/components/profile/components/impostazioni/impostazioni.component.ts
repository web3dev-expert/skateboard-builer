import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../interfaces/interfaces';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProfileServive } from '../../../../services/profile.service';
import { MatDialog } from '@angular/material/dialog';
import { RichiestaComponent } from '../../../../shared/components/richiesta/richiesta.component';
import { FormsService } from '../../../../services/forms.service';
import { AuthService } from '../../../../services/auth.service';

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
  richiestaPage: number = 0;
  richiestaParametersForm: FormGroup = new FormGroup({});
  richiestaSizes: number[] = [5, 10, 20];
  richiestaSorts: string[] = ['id', 'oggetto', 'descrizione', 'data di caricamento'];
  richiestaOrders: any[] = [['Dal primo all\'ultimo', 'ASC'], ['Dall\'ultimo al primo', 'DESC']];
  altreImpostazioniForm: FormGroup = new FormGroup({});
  citta: any[] = [];
  constructor(private toastr: ToastrService, private profileService: ProfileServive, private datePipe: DatePipe, private matDialog: MatDialog, private formService: FormsService, private authService:AuthService) { }

  ngOnInit(): void {
    this.assistenzaForm = new FormGroup({
      oggetto: new FormControl('', Validators.required),
      descrizione: new FormControl('', Validators.required)
    });
    this.richiestaParametersForm = new FormGroup({
      size: new FormControl(5),
      sort: new FormControl('id'),
      order: new FormControl('ASC'),
      oggetto: new FormControl(''),
      descrizione: new FormControl(''),
      from: new FormControl(''),
      to: new FormControl('')
    });
    this.altreImpostazioniForm = new FormGroup({
      nome: new FormControl(this.user!.nome, Validators.required),
      cognome: new FormControl(this.user!.cognome, Validators.required),
      citta: new FormControl(this.user!.citta.id, Validators.required)
    });
    this.getRichieste();
    this.getCitta();
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
    dialogRef.afterClosed().subscribe({
      next: (data: any) => {
        if (data == true) {
          this.getRichieste();
        }
      }
    });
  }

  getRichiesteByParams() {
    let areDateValid: boolean = true;
    if ((this.richiestaParametersForm.get('from')?.value && !this.richiestaParametersForm.get('to')?.value) ||
      (!this.richiestaParametersForm.get('from')?.value && this.richiestaParametersForm.get('to')?.value)) {
      this.toastr.error("Inserisci da quando a quando.");
      areDateValid = false;
    }
    if (areDateValid) {
      this.profileService.getRichiesteByFilters(
        this.user!.id,
        this.richiestaParametersForm.get('oggetto')?.value,
        this.richiestaParametersForm.get('descrizione')?.value,
        this.richiestaParametersForm.get('from')?.value,
        this.richiestaParametersForm.get('to')?.value,
        this.richiestaPage,
        this.richiestaParametersForm.get('size')?.value,
        this.richiestaParametersForm.get('sort')?.value,
        this.richiestaParametersForm.get('order')?.value,
      ).subscribe({
        next: (data: any) => {
          this.richieste = data;
        }
      })
    }
  }
  getCitta() {
    this.formService.getCities().subscribe({
      next: (data: any) => {
        this.citta = data;
      }
    })
  }
  updateProfile() {
    if (this.altreImpostazioniForm.valid) {
      let user: any = {
        nome: this.altreImpostazioniForm.get('nome')?.value,
        cognome: this.altreImpostazioniForm.get('cognome')?.value,
        cittaId: this.altreImpostazioniForm.get('citta')?.value,
      }

      this.profileService.putUser(user, this.user!.id).subscribe({
        next: (user: any) => {
          this.user = user;
          this.authService.setUser(user);
          this.authService.isAuthenticatedUser.next(true);
        }
      })

    } else {
      this.toastr.show("Completa correttamente il form");
    }
  }
}
