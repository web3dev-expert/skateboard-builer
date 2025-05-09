import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfileServive } from '../../../../../services/profile.service';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ModeService } from '../../../../../services/mode.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-insert-text',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, NgFor, NgIf, NgClass, MatDialogClose,ReactiveFormsModule],
  templateUrl: './insert-text.component.html',
  styleUrl: './insert-text.component.scss'
})
export class InsertTextComponent implements OnInit {

  icons: any[] = [];
  colors: any[] = [];
  sizes: any[] = [];
  mode: string = 'light';
  insertTextForm : FormGroup = new FormGroup({});
  @ViewChild('testo') testo:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private profiloService: ProfileServive, private toastr: ToastrService,
    private modeService: ModeService, private matDialogRef: MatDialogRef<InsertTextComponent>) {
    this.modeService.mode.subscribe((data: string) => {
      this.mode = data;
    })
  }

  ngOnInit() {
    console.log(this.data);
    this.icons = this.data[1];
    this.colors = this.data[2];
    this.sizes = this.data[3];
    this.initializeForm();
  }

selectItems(item:string){
console.log(this.testo);
}

initializeForm(){
  this.insertTextForm = new FormGroup({
    testo : new FormControl('',Validators.required)
  })
}


close(){
  this.matDialogRef.close(false);
}
}
