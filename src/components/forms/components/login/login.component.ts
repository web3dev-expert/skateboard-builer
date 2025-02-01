import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModeService } from '../../../../services/mode.service';
import { FormsService } from '../../../../services/forms.service';
import { ShowErrorService } from '../../../../services/show-error.service';
import { AuthService } from '../../../../services/auth.service';

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

  constructor(private toastr: ToastrService, private router: Router, private modeService: ModeService, private formsService: FormsService,
    private error:ShowErrorService,private authService:AuthService
  ) {
    this.modeService.mode.subscribe((data: string) => {
      if (data) {
        this.mode = data;
      }
    })
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  let isUserAuthenticated = this.authService.isAuthenticatedUser;
  if(isUserAuthenticated){
    this.authService.setToken('');
    this.authService.setUser(null)
    this.authService.authenticateUser(false);
    this.toastr.show("Logout avvenuto con successo.")
  }
  }

  login() {
    this.isLoginFormSubmitted = true;
    if (this.loginForm.valid) {
      this.formsService.logIn(
        {
          email: this.loginForm.controls['email'].value,
          password: this.loginForm.controls['password'].value
        }
      ).subscribe({
        next: (data: any) => {
          if(data){
            this.toastr.show("Login effettuato.");
            this.authService.setToken(data?.token?.accessToken);
            localStorage.setItem('refreshToken' , JSON.stringify(data?.token?.refreshToken));
            localStorage.setItem('accessToken' , JSON.stringify(data?.token?.accessToken));
            this.authService.setUser(data.user);
            this.authService.authenticateUser(true);
            this.router.navigate(['lobby']);
          }
        },
        error: (error: any) => {
          this.error.handleError(error)
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
}
