import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  standalone: false,
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit{
login:FormGroup = new FormGroup({});
signup:FormGroup = new FormGroup({});

constructor(private router:Router){}
ngOnInit(): void {
// this.router.navigate(['forms/login'])
}
}
