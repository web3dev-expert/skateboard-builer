import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
  isOpen:boolean = false;
  signupForm:FormGroup = new FormGroup({});
  constructor(private router:Router){
  }

  ngOnInit(): void {
  }

  toggleMenu(open: boolean) {
    this.isOpen = open;
  }

  switchRoute(route: string) {
    route == 'forms' ? this.router.navigate(['forms']) : this.router.navigate(['forms/login'])
  }

  signup(){}
}
