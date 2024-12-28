import { Component, OnInit } from '@angular/core';
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
  isOpen:boolean=false
  constructor(private toastr: ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  login() {
    if (this.loginForm.valid) {

    } else {
      this.toastr.error("Completa correttamente il form!")
    }
  }

goToSignup(open:boolean){
  this.isOpen=open;
}
}
