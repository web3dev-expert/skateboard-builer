import { Component, Input, OnInit } from '@angular/core';
import { EmojiComponent } from '../../../../shared/components/emoji/emoji.component';
import { TextEditorComponent } from '../../../../shared/components/text-editor/text-editor.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileServive } from '../../../../services/profile.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../interfaces/interfaces';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-descrizione',
  standalone: true,
  imports: [EmojiComponent,TextEditorComponent, ReactiveFormsModule, NgClass, EmojiComponent, TextEditorComponent],
  templateUrl: './descrizione.component.html',
  styleUrl: './descrizione.component.scss'
})
export class DescrizioneComponent implements OnInit{
descrizioneForm:FormGroup = new FormGroup({});
remainingCharacters: number = 5000;
@Input() visitedUser: User | null = null;
descrizioneInnerHTML:string = '';
constructor(private profiloService:ProfileServive, private authService: AuthService, private toastr: ToastrService){
}

ngOnInit(): void {
  this.descrizioneForm = new FormGroup({
    descrizione : new FormControl(this.visitedUser!.descrizione)
  })
}

calculateRemainingCharacters(){
  let descrizioneLength = this.descrizioneForm.get('descrizione')?.value?.length;
  if(this.descrizioneForm.get('descrizione')?.value?.length<=5000){
    this.remainingCharacters = 5000 - descrizioneLength;
  }else{
    this.remainingCharacters=0;
    this.descrizioneForm.get('descrizione')?.setValue(this.descrizioneForm.get('descrizione')?.value.substring(0,5000));
    this.descrizioneForm.updateValueAndValidity();
    if(this.descrizioneForm.get('descrizione')?.value?.length<5000){
      this.remainingCharacters = 5000 - descrizioneLength;
    }
  }
}

aggiungiDescrizione(){
if(this.descrizioneForm.valid){
this.profiloService.updateDescrizione(this.descrizioneForm.get('descrizione')?.value).subscribe({
next:(resp:any)=>{
  this.authService.setUser(resp);
  this.authService.authenticateUser(true);
  this.visitedUser= resp;
  localStorage.setItem('visitedUser', JSON.stringify(resp));
}
})
}else{
  this.toastr.warning("Aggiungi una descrizione valida. Ricordati : \n "+ " più di 0 caratteri, meno di 5000.")
}
}
writeText(descrizione: HTMLDivElement){
 console.log(descrizione)
}
}
