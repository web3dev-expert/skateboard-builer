import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';

@Component({
  selector: 'app-forms',
  standalone: false,
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit{
section:string = 'login';
login:FormGroup = new FormGroup({});
signup:FormGroup = new FormGroup({});

ngOnInit(): void {
  console.log(this.section)
}
}
