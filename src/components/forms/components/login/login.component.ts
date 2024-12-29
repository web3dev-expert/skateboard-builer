import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrIconClasses, ToastrService } from 'ngx-toastr';

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
  constructor(private toastr: ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })

    let form = document.getElementsByClassName('login-form')[0] as HTMLElement;
    if (window.innerWidth > 767) {
      form.classList.add('w-50','border','shadow','rounded','p-3','my-3')
      form.classList.remove('w-75')
    } else {
      form.classList.add('w-75','border','shadow','rounded','p-3','my-3')
      form.classList.remove('w-50')
    }

  }

  login() {
    console.log('login :' + this.loginForm.valid)
    if (this.loginForm.valid) {

    } else {
      this.toastr.error("Completa correttamente il form!")
    }
  }

  toggleMenu(open: boolean) {
    this.isOpen = open;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let form = document.getElementsByClassName('login-form')[0] as HTMLElement;

    if (event.target.innerWidth > 767) {
      form.classList.add('w-50','border','shadow','rounded','p-3','my-3')
      form.classList.remove('w-75')
    } else {
      form.classList.add('w-75','border','shadow','rounded','p-3','my-3')
      form.classList.remove('w-50')
    }
  }
  switchRoute(route:string){
route=='forms'?this.router.navigate(['forms']):this.router.navigate(['forms/signup'])
  }
}
