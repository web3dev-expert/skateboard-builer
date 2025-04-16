import { NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-impostazioni',
  standalone: true,
  imports: [NgIf],
  templateUrl: './impostazioni.component.html',
  styleUrl: './impostazioni.component.scss'
})
export class ImpostazioniComponent implements OnInit, OnChanges{
@Input() section: string = '';

ngOnChanges(changes: SimpleChanges): void {
  console.log(this.section);
}
ngOnInit(): void {
  
}
}
