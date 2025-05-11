import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfileServive } from '../../../../../services/profile.service';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ModeService } from '../../../../../services/mode.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-insert-text',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, NgFor, NgIf, NgClass, MatDialogClose, ReactiveFormsModule],
  templateUrl: './insert-text.component.html',
  styleUrl: './insert-text.component.scss'
})
export class InsertTextComponent implements OnInit {

  icons: any[] = [];
  colors: any[] = [];
  sizes: any[] = [];
  mode: string = 'light';
  separatedClasses: string = '';
  @ViewChild('testo') testo: any;
  remainingCharacters: number = 0;
  initialRemainingCharacters: number = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private profiloService: ProfileServive, private toastr: ToastrService,
    private modeService: ModeService, private matDialogRef: MatDialogRef<InsertTextComponent>) {
    this.modeService.mode.subscribe((data: string) => {
      this.mode = data;
    })
  }

  ngOnInit() {
    if ((this.data[0] as String).startsWith('<')) {
      setTimeout(() => {
        this.testo!.nativeElement!.innerHTML += this.data[0];
      }, 1000)
    } else {
      this.separatedClasses += this.data[0];
      setTimeout(() => {
        this.testo.nativeElement.classList.add(this.data[0]);
      }, 1000)
    }
    this.icons = this.data[1];
    this.colors = this.data[2];
    this.sizes = this.data[3];
    this.remainingCharacters = this.data[4];
    this.initialRemainingCharacters = this.data[4];
  }

  selectItems(item: string) {
    if ((item as String).startsWith('<')) {
      if (this.testo!.nativeElement!.innerHTML.includes(item.substring(0,item.indexOf('>')+1))) {
        this.testo!.nativeElement!.innerHTML = this.testo!.nativeElement!.innerHTML.replace(item.substring(0,item.indexOf('>')+1),'');
        this.testo!.nativeElement!.innerHTML = this.testo!.nativeElement!.innerHTML.replace(item.substring(item.lastIndexOf('<')));
        console.log('if' + this.testo!.nativeElement!.innerHTML)
        return;
      }
      console.log(item.substring(0, item.indexOf('>')+1))
      this.testo!.nativeElement!.innerHTML = item.substring(0, item.indexOf('>')+1) + this.testo!.nativeElement!.innerHTML + item.substring(item.lastIndexOf('<'));
      console.log('else' + this.testo!.nativeElement!.innerHTML)
    } else {
      if (this.separatedClasses.includes(item)) {
        this.separatedClasses = this.separatedClasses.replace(item, '');
        this.separatedClasses = this.separatedClasses.substring(0, this.separatedClasses.lastIndexOf(' '));
        this.testo.nativeElement.classList.remove(item);
        return;
      }
      this.separatedClasses += (' ' + item);
      this.testo.nativeElement.classList.add(item);
    }
  }



  close() {
    this.matDialogRef.close(false);
  }

  calculateRemainingCharacters(descrizione: HTMLDivElement) {
    if (descrizione.innerHTML.includes('<del>')) {
      if (!descrizione.innerHTML.startsWith('<del>')) {
        descrizione.innerHTML = descrizione.innerHTML.replace('<del>', '');
        descrizione.innerHTML = '<del>' + descrizione.innerHTML;
      }
    }
    if (descrizione.innerHTML.includes('<u>')) {
      if (!descrizione.innerHTML.startsWith('<u>')) {
        descrizione.innerHTML = descrizione.innerHTML.replace('<u>', '');
        descrizione.innerHTML = '<u>' + descrizione.innerHTML;
      }
    }
    let checkTrick = (descrizione?.innerHTML === "<br>" && descrizione.innerHTML.length === 4) || descrizione.innerHTML.length == 0;
    let descrizioneLength = checkTrick ? 0 : descrizione?.innerText?.length;
    if (descrizione?.innerText?.length <= this.initialRemainingCharacters) {
      this.remainingCharacters = this.initialRemainingCharacters - descrizioneLength;
    } else {
      this.remainingCharacters = 0;
      descrizione.innerText = descrizione?.innerText?.substring(0, this.initialRemainingCharacters);
      if (descrizione?.innerText?.length < this.initialRemainingCharacters) {
        this.remainingCharacters = this.initialRemainingCharacters - descrizioneLength;
      }
    }
    if (checkTrick) {
      descrizione.innerHTML = '';
    }
  }

  selectedClasses() {
    return this.separatedClasses;
  }
}
