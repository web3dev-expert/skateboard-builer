import { NgFor, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    var  svg = document.getElementById("svg")! as unknown as SVGGraphicsElement;
    var  bbox = svg.getBBox();
    svg.setAttribute("width", String(bbox.x + bbox.width + bbox.x));
//     svg.setAttribute("height",  String(bbox.y + bbox.height + bbox.y)); 
 }
}
