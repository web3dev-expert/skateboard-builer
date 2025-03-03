import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModeService } from '../../../../services/mode.service';
import { FormsService } from '../../../../services/forms.service';
import { ShowErrorService } from '../../../../services/show-error.service';
import { AuthService } from '../../../../services/auth.service';
import { AuthGuard } from '../../../../core/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  isLoginFormSubmitted: boolean = false;
  isOpen: boolean = false;
  canMoveMenu: boolean = false;
  mode: string = 'light';
  showSpinner: boolean = false;
  showInsertCode: boolean = false;
  previousEmail:string = '';
  constructor(private toastr: ToastrService, private router: Router, private modeService: ModeService, private formsService: FormsService,
     private authService: AuthService, private authGuard: AuthGuard, private errorService: ShowErrorService
  ) {
    this.modeService.mode.subscribe((data: string) => {
      if (data) {
        this.mode = data;
      }
    })
    this.errorService.showSpinner.subscribe((data:boolean)=>{
      this.showSpinner = data;
    })
    this.formsService.requestLoginCode.subscribe((data:any)=>{
      if(data=="Abbiamo inviato un codice alla mail da te indicata. Inseriscilo qui sotto."){
        this.previousEmail = this.loginForm.get('email')?.value;
        this.showInsertCode = true;
      }else{
        this.showInsertCode = false;
      }
    })
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
    let isUserAuthenticated = this.authGuard.isAuthenticated;
    if (isUserAuthenticated) {
      this.authService.setToken('');
      this.authService.setUser(null)
      this.authService.authenticateUser(false);
      localStorage.clear()
      this.toastr.show("Logout avvenuto con successo.")
    }
    this.onResize()
  }

  login() {
    this.isLoginFormSubmitted = true;
    if(this.showInsertCode&&this.previousEmail == this.loginForm.get('email')?.value) this.toastr.show("Ti abbiamo già mandato un codice per mail, inseriscilo qui. E' valido per 2 minuti.")
    else
    if (this.loginForm.get('email')!.valid&&this.loginForm.get('password')!.valid) {
      this.showInsertCode = false;
      this.showSpinner = true;
      this.formsService.logIn(
        {
          email: this.loginForm.controls['email'].value,
          password: this.loginForm.controls['password'].value
        }
      ).subscribe({
        next: (data: any) => {
          if (data) {
            setTimeout(() => {
              this.showSpinner = false;
              this.toastr.show("Login effettuato.");
              this.authService.setToken(data?.token?.accessToken);
              localStorage.setItem('refreshToken', data?.token?.refreshToken);
              localStorage.setItem('accessToken', data?.token?.accessToken);
              this.authService.setUser(data.user);
              this.authService.authenticateUser(true);
              this.router.navigate(['lobby']);
            }, 1000)
          }
        }
      })
    } else {
      this.toastr.error("Completa correttamente il form!")
    }
  }

  toggleMenu(open: boolean) {
    this.isOpen = open;
  }

  switchRoute(route: string) {
    route == 'forms' ? this.router.navigate(['forms']) : this.router.navigate(['forms/signup'])
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 630) {
      for (let i = 1; i <= 4; i++) {
        let div = document.getElementsByClassName(`box-${i}`)[0] as HTMLDivElement;
        if(div){
          div.style.visibility = 'hidden'
        }
      }
    } else {
      for (let i = 1; i <= 4; i++) {
        let div = document.getElementsByClassName(`box-${i}`)[0] as HTMLDivElement;
        if(div){
          div.style.visibility = 'visible'
        }
      }
    }
  }
}
