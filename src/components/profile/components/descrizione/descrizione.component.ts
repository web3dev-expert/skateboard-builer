import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
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
export class DescrizioneComponent implements OnInit, AfterContentChecked {
  remainingCharacters: number = 5000;
  @Input() visitedUser: User | null = null;

  descrizioneInnerHTML: string = '';
  addedOptions: string[] = [];
  @ViewChild('descrizione') descrizione!: any;
  constructor(private profiloService: ProfileServive, private authService: AuthService, private toastr: ToastrService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {

  }


  calculateRemainingCharacters(descrizione: HTMLDivElement) {
    let checkTrick = (descrizione?.innerHTML === "<br>" && descrizione.innerHTML.length === 4) || descrizione.innerHTML.length == 0;
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
    if (checkTrick) {
      descrizione.innerHTML = '';
    }
  }

  aggiungiDescrizione(descrizione: HTMLDivElement) {
    let checkTrick = (descrizione?.innerHTML === "<br>" && descrizione.innerHTML.length === 4) || descrizione.innerHTML.length == 0;
    if (!checkTrick) {
      debugger
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

  onReceiveUpdatesFromTextEditor(event: any) {
    
    console.log(event.style)
    console.log(event.classList)
    console.log(event.textContent);
    if (event.classList.contains('under-through')) {
      event.style = 'text-decoration:underline line-through;';
    } else if (event.classList.contains('underline')) {
      event.style = 'text-decoration:underline;';
    } else if (event.classList.contains('line-through')) {
      event.style = 'text-decoration:line-through;';
    }

    let outerHTML = event.outerHTML.replaceAll('&amp;nbsp;',' ').replaceAll('&lt;div&gt;', "<div>").replaceAll('&lt;br&gt;', '<br>').replaceAll('&lt;/div&gt;',"<div>");
    console.log(outerHTML)
    this.descrizione!.nativeElement.innerHTML += outerHTML;
  }

  checkTextAreaElements() {
  }
  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }
}
