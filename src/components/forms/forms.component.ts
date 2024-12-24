import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule } from './forms.module';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit{
login:FormGroup = new FormGroup({});
signup:FormGroup = new FormGroup({});

constructor(private router:Router){}
ngOnInit(): void {
}

route(direction:string){
  this.router.navigate([`forms/${direction}`])
}
}
