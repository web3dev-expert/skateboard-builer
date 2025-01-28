import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModeService } from '../../../../services/mode.service';
import { SignupUser } from '../../../../interfaces/interfaces';
import { FormsService } from '../../../../services/forms.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  isOpen: boolean = false;
  signupForm: FormGroup = new FormGroup({});
  signupStep: number = 1;
  cities: any[] = [];
  selectedImage: any = null;
  url: string = '';
  selectedCity: any = '';
  missedDatas: string[] = []
  showPassword: boolean = false;
  maskedPassword: string = '';
  mode:string = 'light';

  constructor(private router: Router, private toastr: ToastrService,private modeService:ModeService,private formsService:FormsService) {
    this.modeService.mode.subscribe((data:string)=>{
     if(data){
      this.mode = data;
     }
    })
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      cognome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      citta: new FormControl('', [Validators.required])
    })
    
    this.getCities()
  }

  toggleMenu(open: boolean) {
    this.isOpen = open;
  }

  switchRoute(route: string) {
    route == 'forms' ? this.router.navigate(['forms']) : this.router.navigate(['forms/login'])
  }

  signup() {
    if (
      this.signupForm.valid && this.selectedImage
    ) {
      let signupUser:SignupUser = {
        email:this.signupForm.get('email')?.value,
        nome:this.signupForm.get('nome')?.value,
        cognome:this.signupForm.get('cognome')?.value,
        password:this.signupForm.get('password')?.value,
        citta_id:this.signupForm.get('citta')?.value,
        immagine_profilo:this.selectedImage
      }

     this.formsService.signUp(signupUser).subscribe({
      next: (data: any) => {
        console.log(data)
      },
      error: (error: any) => {
        this.handleError(error);
      }
     })
    } else {
      this.toastr.error("Assicurati di avere inserito tutti i dati mancanti.")
    }
  }

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
  deleteProfileImage(fileInput: HTMLInputElement) {
    this.url = '';
    this.selectedImage = null;
    fileInput.value = '';
  }
  updateSelectedCity() {
    if(this.signupForm.controls['citta'].value==''){
      this.selectedCity='';
      return;
    }
    this.selectedCity = this.cities.filter(c => c.id == this.signupForm.controls['citta'].value)[0];
  }

  signupCheck(): boolean {
    return this.signupForm.valid && this.selectedImage;
  }

  populateMissedDatasArray() {
    this.missedDatas=[];
    Object.keys(this.signupForm.controls).forEach(key => {
      const control = this.signupForm.get(key);
      if(control?.invalid){
        this.missedDatas.push(key)
      }
    });
    if(!this.selectedImage){
      this.missedDatas.push('immagine del profilo')
    }
  }
  updateFourthStep(){
    this.populateMissedDatasArray()
    
    this.signupStep=4;
  }

  getCities(){
    this.formsService.getCities().subscribe({
      next: (data: any) => {
        this.cities=data;
      },
      error: (error: any) => {
        this.handleError(error);
      }
    })
  }
  handleError(error:any){
    this.toastr.error(error?.error?.message? error?.error?.message :error?.error?.messageList!=undefined? error?.error?.messageList[0] : 'Something wrong happened.');
  }
}
