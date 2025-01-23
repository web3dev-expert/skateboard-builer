import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../components/nav/nav.component';
import { FootComponent } from '../components/foot/foot.component';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ModeService } from '../services/mode.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavComponent,FootComponent,NgIf,NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'game-front';
  showGoTop:boolean = false;
  mode:string = 'light';

constructor(private modeService:ModeService){
this.modeService.mode.subscribe((data:string)=>{
  this.mode=data;
})
}

  @HostListener('window:scroll', ['$event']) private onScroll():void {
    if(window.scrollY>500){
      this.showGoTop=true;
    }else{
      this.showGoTop=false;
    }
  };

  goUp(){
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
});
  }
}
