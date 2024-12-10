import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsComponent } from "./forms.component";
import { CommonModule } from "@angular/common";

@NgModule({
      declarations: [
        FormsComponent
      ],
      imports: [
        CommonModule,
        ReactiveFormsModule
      ],
    })
export class FormsModule {}