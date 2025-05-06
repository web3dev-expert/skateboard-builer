import { Component, Input, OnInit } from '@angular/core';
import { EmojiComponent } from '../../../../shared/components/emoji/emoji.component';
import { TextEditorComponent } from '../../../../shared/components/text-editor/text-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileServive } from '../../../../services/profile.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../interfaces/interfaces';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-descrizione',
  standalone: true,
  imports: [EmojiComponent, TextEditorComponent, ReactiveFormsModule, NgClass, EmojiComponent, TextEditorComponent],
  templateUrl: './descrizione.component.html',
  styleUrl: './descrizione.component.scss'
})
export class DescrizioneComponent implements OnInit {
  remainingCharacters: number = 5000;
  @Input() visitedUser: User | null = null;
  
  descrizioneInnerHTML: string = '';
  addedOptions : string[] = [];
  constructor(private profiloService: ProfileServive, private authService: AuthService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
  
  }

  calculateRemainingCharacters(descrizione: HTMLDivElement) {
    let checkTrick = descrizione?.innerHTML === "<br>"&&descrizione.innerHTML.length === 4;
    let descrizioneLength = checkTrick ? 0 : descrizione?.innerText?.length;
    if (descrizione?.innerText?.length <= 5000) {
      this.remainingCharacters = 5000 - descrizioneLength;
    } else {
      this.remainingCharacters = 0;
      descrizione.innerText = descrizione?.innerText?.substring(0, 5000);
      if (descrizione?.innerText?.length < 5000) {
        this.remainingCharacters = 5000 - descrizioneLength;
      }
    }
    if(checkTrick){
      descrizione.innerHTML = '';
    }
  }

  aggiungiDescrizione(descrizione:HTMLDivElement) {
    if (!descrizione.innerHTML.trim()) {
      this.profiloService.updateDescrizione(descrizione.innerHTML).subscribe({
        next: (resp: any) => {
          this.authService.setUser(resp);
          this.authService.authenticateUser(true);
          this.visitedUser = resp;
          localStorage.setItem('visitedUser', JSON.stringify(resp));
        }
      })
    } else {
      this.toastr.warning("Aggiungi una descrizione valida. Ricordati : \n " + " più di 0 caratteri, meno di 5000.")
    }
  }

  onReceiveUpdatesFromTextEditor(event:any){
     if(this.addedOptions.includes(event)){
        this.addedOptions = this.addedOptions.filter(a=> a!=event);
     }else{
      this.addedOptions.push(event);
     }
     console.log(this.addedOptions);
  }
}
