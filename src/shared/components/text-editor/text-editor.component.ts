import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [NgClass, NgFor],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss'
})
export class TextEditorComponent {
  icons: Set<{ value: string, label: string }> = new Set([
    { value: 'fw-bold', label: 'bi-type-bold' },
    { value: 'fst-italic', label: 'bi-type-italic' },
    { value: '<u></u>', label: 'bi-type-underline' },
    { value: '<del></del>', label: 'bi-type-strikethrough' },
    { value: 'text-center', label: 'bi-text-center' },
    { value: 'text-start', label: 'bi-text-left' },
    { value: 'text-end', label: 'bi-text-right' }
  ]);
  colors: Set<{ value: string, label: string }> = new Set([
    { value: 'text-dark', label: 'dark' },
    { value: 'text-white', label: 'white' },
    { value: 'text-danger', label: 'red' },
    { value: 'text-warning', label: 'yellow' },
    { value: 'text-success', label: 'green' },
    { value: 'text-primary', label: 'blue' },
    { value: 'text-info', label: 'light blue' },
    { value: 'text-secondary', label: 'gray' }
  ]);
  sizes: Set<{ value: string, label: string }> = new Set([
    { value: 'fs-6', label: 'smaller' },
    { value: 'fs-5', label: 'small' },
    { value: 'fs-4', label: 'medium small' },
    { value: 'fs-3', label: 'medium big' },
    { value: 'fs-2', label: 'big' },
    { value: 'fs-1', label: 'bigger' }
  ]);
  selectedItems: string[] = [];
  @Input() textareaInnerHTML: string = '';
  @Output() sendUpdates: EventEmitter<string> = new EventEmitter<string>();

  selectItems(items: string) {
    if (this.selectedItems.includes(items)) {
      this.clearSelectedItems(items);
      this.update(items);
    } else {
      if (items != 'text-center' && items != 'text-start' && items != 'text-end') {
        this.selectedItems.push(items);
      } else {
        debugger
        if (items == 'text-center' && (this.selectedItems.includes('text-start') || this.selectedItems.includes('text-end'))) {
          this.selectedItems.includes('text-start') ? this.clearSelectedItems('text-start') : this.selectedItems.includes('text-end') ?
            this.clearSelectedItems('text-end') : ""
          this.selectedItems.push(items);
        } else if (items == 'text-end' && (this.selectedItems.includes('text-start') || this.selectedItems.includes('text-center'))) {
          this.selectedItems.includes('text-start') ? this.clearSelectedItems('text-start') : this.selectedItems.includes('text-center') ?
            this.clearSelectedItems('text-center') : ""
          this.selectedItems.push(items);
        } else if (items == 'text-start' && (this.selectedItems.includes('text-end') || this.selectedItems.includes('text-center'))) {
          this.selectedItems.includes('text-end') ? this.clearSelectedItems('text-end') : this.selectedItems.includes('text-center') ?
            this.clearSelectedItems('text-center') : ""
          this.selectedItems.push(items);
        }else{
          this.selectedItems.push(items);
        }
      }
      this.update(items);
    }
  }

  update(value: string) {
    this.sendUpdates.emit(value);
  }
  clearSelectedItems(item: string) {
    return this.selectedItems = this.selectedItems.filter((a: string) => a != item);
  }
}
