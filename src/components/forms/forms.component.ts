import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule } from './forms.module';
import { ModeService } from '../../services/mode.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit{
login:FormGroup = new FormGroup({});
signup:FormGroup = new FormGroup({});
mode:string = 'light';
balls:number[]=[1,2,3,4,5,6]
constructor(private router:Router,private modeService:ModeService){
  this.modeService.mode.subscribe((data:string)=>{
    if(data){
      this.mode=data;
    }
  })
}
ngOnInit(): void {
}

route(direction:string){
  this.router.navigate([`forms/${direction}`])
}
}
