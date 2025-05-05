import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [NgClass, NgFor],
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
  @Input() textareaInnerHTML:string = '';


  selectItems(items: string) {
    if (this.selectedItems == items) {
      this.selectedItems = ''
    } else {
      this.selectedItems = items
      this.checkTextAndItem()
    }
  }
  checkTextAndItem() {
console.log(this.textareaInnerHTML)
  }
}
