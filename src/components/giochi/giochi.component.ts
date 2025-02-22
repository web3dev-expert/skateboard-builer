import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-giochi',
  templateUrl: './giochi.component.html',
  styleUrl: './giochi.component.scss'
})
export class GiochiComponent implements OnInit {
  giochi: any[] = [];
  giocoForm!: FormGroup;
  selectedGame:any =null;
  selectedImage:any = null;
  url:string='';
  ngOnInit(): void {
    this.giocoForm = new FormGroup({
      image:new FormControl('',Validators.required)
    })
    this.getGames()
  }

  onHandleImage(event: any) {
    if(this.selectedGame){
    if (event && event.target && event.target.files && event.target.files[0]) {
  console.log(event)
      var reader = new FileReader();

      this.selectedImage = event.target.files[0]
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (eventR: any) => {
        this.url = eventR.target.result;
      };
    }
  }else{
    (document.getElementsByClassName('message')[0] as HTMLElement).textContent = "Selezione il gioco da modificare.";
    this.giocoForm.reset();
  }
  } 

  uploadImage(){
    if(this.giocoForm.valid&& this.selectedImage && this.selectedGame){
      let formData = new FormData();
      formData.append('gioco_image', this.selectedImage);

      fetch(`http://localhost:3031/auth/gioco/${this.selectedGame.id}`,{
        method:'PUT',
        body: formData
      }).then((response: any) => {
        if (response.ok) return response.json();
        else throw new Error("Promis aborted.")
      }).then((res: any) => {
        if (res) {
         console.log(res);
         (document.getElementsByClassName('message')[0] as HTMLElement).textContent = ""
         this.giocoForm.reset()
         this.url='';
         this.selectedGame=null;
         this.selectedImage=null;
         this.getGames();
        }
      }).catch((error: any) => {
        console.error(error.Error)
      })
    }
  }
  getGames(){
    fetch('http://localhost:3031/auth/gioco').then((response: any) => {
      if (response.ok) return response.json();
      else throw new Error("Promis aborted.")
    }).then((res: any) => {
      if (res) {
       this.giochi=res;
      }
    }).catch((error: any) => {
      console.error(error.Error)
    })
  }
}
