import { NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from '../../../../interfaces/interfaces';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-impostazioni',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule,MatTooltipModule],
  templateUrl: './impostazioni.component.html',
  styleUrl: './impostazioni.component.scss'
})
export class ImpostazioniComponent implements OnInit {
  @Input() section: string = '';
  @Input() user: User | null = null;
  assistenzaForm: FormGroup = new FormGroup({});

  constructor(private toastr: ToastrService) { }
  ngOnInit(): void {
    this.assistenzaForm = new FormGroup({
      oggetto: new FormControl('', Validators.required),
      descrizione: new FormControl('', Validators.required)
    })
  }

  inviaRichiesta() {
    if (this.assistenzaForm.valid) {

    } else {
      this.toastr.show('Inserisci i campi richiesti.')
    }
  }
}
