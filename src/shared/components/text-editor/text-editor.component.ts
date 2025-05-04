import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [NgClass,NgFor],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss'
})
export class TextEditorComponent {
  icons: Set<string> = new Set([
    'bi-type-bold',
    'bi-type-italic',
    'bi-type-underline',
    'bi-type-strikethrough',
    'bi-text-center',
    'bi-text-left',
    'bi-text-right'
  ]);
  selectedItems: string = '';
  point(event: any) {
    console.log(event)
  }

  selectItems(items: string) {
    console.log(this.selectedItems , items)
    if (this.selectedItems == items) {
      this.selectedItems = ''
    } else {
      this.selectedItems = items
    }
  }
 
}
