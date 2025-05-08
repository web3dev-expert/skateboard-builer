import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModeService } from '../../../services/mode.service';
import { isEarlyEventType } from '@angular/core/primitives/event-dispatch';
import { MatDialog } from '@angular/material/dialog';
import { InsertTextComponent } from './components/insert-text/insert-text.component';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [NgClass, NgFor],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss'
})
export class TextEditorComponent {
  mode: string = 'light';
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

  constructor(private modeService: ModeService, private matDialog: MatDialog) {
    this.modeService.mode.subscribe((data: string) => {
      this.mode = data;
    })
  }

  selectItems(item: string) {
    let items: any[] = [];
    this.icons.forEach((icon: any) => {
      if (icon.value != item) {
        items.push(icon);
      }
    });
    let colors: any[] = [];
    this.colors.forEach((color: any) => {
      if (color.value != item) {
        colors.push(color);
      }
    })
    let sizes: any[] = [];
    this.sizes.forEach((size: any) => {
      if (size.value != item) {
        sizes.push(size);
      }
    })
    const dialogRef = this.matDialog.open(InsertTextComponent, { data: [item, items,colors,sizes] });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        let element = data;
        this.update(data);
      }
    })
  }

  update(value: string) {
    this.sendUpdates.emit(value);
  }
  clearSelectedItems(item: string) {
    return this.selectedItems = this.selectedItems.filter((a: string) => a != item);
  }
}
