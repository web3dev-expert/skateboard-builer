import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
  isOpen:boolean = false;
  signupForm:FormGroup = new FormGroup({});
  signupStep:number = 1;
  cities:any[] = [];
  selectedImage:any = null;
  url:string = '';
  constructor(private router:Router){
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      nome: new FormControl('',[Validators.required]),
      cognome: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
      password: new FormControl('',[Validators.required,Validators.minLength(8)]),
      citta: new FormControl('',[Validators.required])
    })
  }

  toggleMenu(open: boolean) {
    this.isOpen = open;
  }

  switchRoute(route: string) {
    route == 'forms' ? this.router.navigate(['forms']) : this.router.navigate(['forms/login'])
  }

  signup(){}

  handleProfileImage(event: any) {
    if (event && event.target && event.target.files && event.target.files[0]) {
      this.selectedImage = event.target.files[0];

      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (eventR: any) => {
        this.url = eventR.target.result;
      };
    }
  }
  deleteProfileImage(fileInput:HTMLInputElement){
    this.url='';
    this.selectedImage=null;
    fileInput.value='';
  }
}
