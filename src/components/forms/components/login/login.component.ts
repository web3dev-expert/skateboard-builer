import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModeService } from '../../../../services/mode.service';
import { FormsService } from '../../../../services/forms.service';

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

  constructor(private toastr: ToastrService, private router: Router, private modeService: ModeService, private formsService: FormsService) {
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
          console.log(data)
        },
        error: (error: any) => {
          this.toastr.error(error?.error?.message? error?.error?.message :error?.error?.messageList!=undefined? error?.error?.messageList[0] : 'Something wrong happened.')
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
